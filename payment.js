/* ==========================================
   TOOLBOX PAYMENT
========================================== */

const PRICE = 199;
const PLAN = "PRO Monthly";

if (typeof paypal === "undefined") {
    console.error("PayPal SDK failed to load.");
    alert("PayPal failed to load. Please refresh the page.");
} else {

paypal.Buttons({

    createOrder(data, actions) {

        return actions.order.create({
            purchase_units: [{
                description: "ToolBox Pro Monthly Subscription",
                amount: {
                    currency_code: "PHP",
                    value: PRICE.toFixed(2)
                }
            }]
        });

    },

    async onApprove(data, actions) {

        try {

            const details = await actions.order.capture();

            const {
                data: { user },
                error: authError
            } = await client.auth.getUser();

            if (authError || !user) {

                alert("Please login first.");
                window.location.href = "../auth.html";
                return;

            }

            const { error } = await client
                .from("payment_requests")
                .insert({

                    user_id: user.id,
                    email: user.email,

                    method: "PayPal",
                    reference_number: details.id,
                    screenshot: null,

                    amount: PRICE,
                    plan: PLAN,

                    status: "pending"

                });

            if (error) throw error;

            alert("✅ Payment submitted successfully!\n\nPlease wait for admin approval.");

            window.location.href = "../index.html";

        } catch (err) {

            console.error(err);
            alert(err.message);

        }

    },

    onCancel() {

        alert("Payment cancelled.");

    },

    onError(err) {

        console.error(err);
        alert("PayPal payment failed.");

    }

}).render("#paypal-button-container");

}