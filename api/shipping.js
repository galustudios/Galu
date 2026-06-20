// api/shipping.js
// Calculates shipping rates via Printful based on cart items and destination

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cartItems, address } = req.body;

  if (!cartItems || !address) {
    return res.status(400).json({ error: "Missing cartItems or address" });
  }

  try {
    const items = cartItems.map((item) => ({
      quantity: item.qty,
      variant_id: item.printfulVariantId || null, // update when products are synced
    }));

    const shippingRes = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
      body: JSON.stringify({
        recipient: {
          address1: address.address1,
          city: address.city,
          state_code: address.state || "",
          country_code: address.country,
          zip: address.zip,
        },
        items,
        currency: "USD",
      }),
    });

    const shippingData = await shippingRes.json();

    if (shippingData.code !== 200) {
      return res.status(400).json({ error: "Could not calculate shipping", details: shippingData });
    }

    // Return simplified rates
    const rates = shippingData.result.map((rate) => ({
      id: rate.id,
      name: rate.name,
      rate: rate.rate,
      currency: rate.currency,
      minDeliveryDays: rate.minDeliveryDays,
      maxDeliveryDays: rate.maxDeliveryDays,
    }));

    return res.status(200).json({ rates });
  } catch (err) {
    console.error("shipping error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}