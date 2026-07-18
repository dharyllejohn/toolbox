import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { payment_id } = await req.json();

    if (!payment_id) {
      return new Response(
        JSON.stringify({ error: "Missing payment_id" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: payment, error: paymentError } = await supabase
      .from("payment_requests")
      .select("*")
      .eq("id", payment_id)
      .single();

    if (paymentError || !payment) {
      return new Response(
        JSON.stringify({ error: "Payment not found" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Kunin current expiration
    const { data: profile, error: profileFetchError } = await supabase
      .from("profiles")
      .select("pro_expire")
      .eq("id", payment.user_id)
      .single();

    if (profileFetchError) {
      return new Response(
        JSON.stringify(profileFetchError),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const expire = profile?.pro_expire
      ? new Date(profile.pro_expire)
      : new Date();

    expire.setDate(expire.getDate() + 30);

    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({
        is_pro: true,
        pro_expire: expire.toISOString().split("T")[0],
      })
      .eq("id", payment.user_id);

    if (profileUpdateError) {
      return new Response(
        JSON.stringify(profileUpdateError),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { error: paymentUpdateError } = await supabase
      .from("payment_requests")
      .update({
        status: "approved",
        renewed_at: new Date().toISOString(),
        renew_months: 1,
      })
      .eq("id", payment_id);

    if (paymentUpdateError) {
      return new Response(
        JSON.stringify(paymentUpdateError),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});