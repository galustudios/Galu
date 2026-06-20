// api/capture-payment.js
// 1. Captures the PayPal payment
// 2. If successful, creates the order in Printful automatically

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orderID, cartItems, shipping } = req.body;

  if (!orderID || !cartItems || !shipping) {
    return res.status(400).json({ error: "Missing orderID, cartItems or shipping info" });
  }

  try {
    // ── STEP 1: Get PayPal access token ──────────────────
    const authRes = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    const authData = await authRes.json();
    const accessToken = authData.access_token;

    if (!accessToken) {
      return res.status(500).json({ error: "Failed to get PayPal token" });
    }

    // ── STEP 2: Capture the PayPal payment ───────────────
    const captureRes = await fetch(
      `https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await captureRes.json();

    if (captureData.status !== "COMPLETED") {
      return res.status(400).json({ error: "Payment not completed", details: captureData });
    }

    // ── STEP 3: Create order in Printful ─────────────────
    // Map cart items to Printful format
    // NOTE: variant_id must match your real Printful product variant IDs
    // You'll need to update these IDs once your products are set up in Printful
    const printfulItems = cartItems.map((item) => ({
      sync_variant_id: item.printfulVariantId || null, // set when products are synced
      quantity: item.qty,
      retail_price: parseFloat(item.price.replace(/[^0-9.]/g, "")).toFixed(2),
    }));

    const printfulOrder = {
      recipient: {
        name: shipping.name,
        address1: shipping.address1,
        address2: shipping.address2 || "",
        city: shipping.city,
        state_code: shipping.state || "",
        country_code: shipping.country,
        zip: shipping.zip,
        email: shipping.email,
      },
      items: printfulItems,
      retail_costs: {
        currency: "USD",
      },
    };

    const printfulRes = await fetch("https://api.printful.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
      body: JSON.stringify(printfulOrder),
    });

    const printfulData = await printfulRes.json();

    if (printfulData.code !== 200) {
      // Payment succeeded but Printful failed — log for manual review
      console.error("Printful order failed after payment:", printfulData);
      return res.status(200).json({
        success: true,
        paypalOrderID: orderID,
        warning: "Payment captured but Printful order needs manual review",
        printfulError: printfulData,
      });
    }

    return res.status(200).json({
      success: true,
      paypalOrderID: orderID,
      printfulOrderID: printfulData.result.id,
    });
  } catch (err) {
    console.error("capture-payment error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}