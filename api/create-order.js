// api/create-order.js
// Creates a PayPal order and returns the order ID to the frontend

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No items in cart" });
  }

  try {
    // 1. Get PayPal access token
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

    // 2. Calculate total
    const total = items
      .reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return sum + price * item.qty;
      }, 0)
      .toFixed(2);

    // 3. Build line items for PayPal
    const lineItems = items.map((item) => ({
      name: `${item.name} (Size ${item.size})`,
      quantity: String(item.qty),
      unit_amount: {
        currency_code: "USD",
        value: parseFloat(item.price.replace(/[^0-9.]/g, "")).toFixed(2),
      },
    }));

    // 4. Create PayPal order
    const orderRes = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: total,
                },
              },
            },
            items: lineItems,
          },
        ],
      }),
    });

    const orderData = await orderRes.json();

    if (!orderData.id) {
      return res.status(500).json({ error: "Failed to create PayPal order", details: orderData });
    }

    return res.status(200).json({ orderID: orderData.id });
  } catch (err) {
    console.error("create-order error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}