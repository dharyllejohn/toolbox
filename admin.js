/* ==========================================
   TOOLBOX ADMIN PAYMENTS
========================================== */

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
                        ? `
                        <a href="${payment.screenshot}" target="_blank">
                            <img src="${payment.screenshot}" width="120">
                        </a>
                        `
                        : "No Screenshot"
                }
            </td>

            <td>${payment.status}</td>

            <td>

                ${
                    payment.status?.toLowerCase() === "pending"

                    ? `
                        <button onclick="approvePayment('${payment.id}')">
                            ✅ Approve
                        </button>

                        <button onclick="rejectPayment('${payment.id}')">
                            ❌ Reject
                        </button>
                    `

                    : payment.status?.toLowerCase() === "approved"

                    ? `
                        <button onclick="refundPayment('${payment.id}')">
                            💸 Refund
                        </button>

                        <button onclick="renewPayment('${payment.id}')">
                            🔄 Renew
                        </button>
                    `

                    : payment.status?.toLowerCase() === "rejected"

                    ? `
                        <span style="color:#ef4444;font-weight:bold;">
                            ❌ Rejected
                        </span>
                    `

                    : payment.status?.toLowerCase() === "refunded"

                    ? `
                        <span style="color:#f59e0b;font-weight:bold;">
                            💸 Refunded
                        </span>
                    `

                    : `
                        <span>-</span>
                    `
                }

            </td>

        </tr>
        `;

    });

}

/* ==========================================
   APPROVE PAYMENT
========================================== */

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

/* ==========================================
   REJECT PAYMENT
========================================== */

async function rejectPayment(paymentId) {

    const reason = prompt("Reason for rejection (optional):");

    const res = await fetch(
        `${SUPABASE_URL}/functions/v1/reject-payment`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                payment_id: paymentId,
                reason: reason
            })
        }
    );

    const result = await res.json();

    if (!res.ok) {
        alert(result.error || "Reject failed.");
        return;
    }

    alert("❌ Payment Rejected");

    loadPayments();

}

/* ==========================================
   REFUND PAYMENT
========================================== */

async function refundPayment(paymentId) {

    if (!confirm("Are you sure you want to refund this payment?")) {
        return;
    }

    const res = await fetch(
        `${SUPABASE_URL}/functions/v1/refund-payment`,
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
        alert(result.error || "Refund failed.");
        return;
    }

    alert("💸 Payment Refunded");

    loadPayments();

}

/* ==========================================
   RENEW PAYMENT
========================================== */

async function renewPayment(paymentId) {

    if (!confirm("Renew PRO for another 30 days?")) {
        return;
    }

    const res = await fetch(
        `${SUPABASE_URL}/functions/v1/renew-payment`,
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
        alert(result.error || "Renew failed.");
        return;
    }

    alert("🔄 PRO renewed for another 30 days");

    loadPayments();

}