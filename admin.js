/* ==========================================
   TOOLBOX ADMIN PAYMENTS
========================================== */

// HUWAG nang ilagay:
// const client = supabaseClient;

loadPayments();

async function loadPayments() {

    const container = document.getElementById("payments");

    const { data, error } = await client
        .from("payment_requests")
        .select("*")
        .order("created_at", { ascending: false });

    console.log("PAYMENTS:", data);
    console.log("ERROR:", error);

    if (error) {
        console.error(error);
        container.innerHTML = `
            <tr>
                <td colspan="6">Error loading payments.</td>
            </tr>
        `;
        return;
    }

    if (!data || data.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6">No payment requests.</td>
            </tr>
        `;
        return;
    }

    container.innerHTML = "";

    data.forEach(payment => {

        container.innerHTML += `
        <tr>

            <td>${payment.email}</td>

            <td>${payment.method}</td>

            <td>${payment.reference_number}</td>

            <td>
                ${
                    payment.screenshot
                    ? `<a href="${payment.screenshot}" target="_blank">
                        <img src="${payment.screenshot}" width="120">
                       </a>`
                    : "No Screenshot"
                }
            </td>

            <td>${payment.status}</td>

            <td>

                <button onclick="approvePayment('${payment.id}')">
                    ✅ Approve
                </button>

            </td>

        </tr>
        `;

    });

}

async function approvePayment(paymentId) {

    const res = await fetch(
        `${SUPABASE_URL}/functions/v1/approve-payment`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                payment_id: paymentId
            })
        }
    );

    const result = await res.json();

    if (!res.ok) {
        alert(result.error || "Approval failed.");
        return;
    }

    alert("✅ Payment Approved");

    loadPayments();

}