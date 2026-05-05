const base = process.env.PAYPAL_MODE === 'live' 
  ? "https://api-m.paypal.com" 
  : "https://api-m.sandbox.paypal.com";

async function generateAccessToken() {
  const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  if (!NEXT_PUBLIC_PAYPAL_CLIENT_ID || !PAYPAL_APP_SECRET) {
    throw new Error("Faltan variables de entorno de PayPal");
  }

  const auth = Buffer.from(NEXT_PUBLIC_PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();
  return data.access_token;
}

export async function createOrder(cartTotal: string) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: cartTotal,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function captureOrder(orderId: string) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

async function handleResponse(response: Response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
