const requiredFields = [
  "WHATSAPP_ACCESS_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "WHATSAPP_TO_NUMBER",
];

const getMissingConfig = () =>
  requiredFields.filter((key) => !process.env[key]);

const clean = (value) => {
  if (typeof value !== "string") return "Not provided";
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Not provided";
};

const buildMessage = (data) => {
  const lines = [
    "New CairoX project inquiry",
    "",
    `Name: ${clean(data.name)}`,
    `Email: ${clean(data.email)}`,
    `Phone: ${clean(data.phone)}`,
    `Company: ${clean(data.company)}`,
    `Project type: ${clean(data.projectType)}`,
    `Budget: ${clean(data.budget)}`,
    "",
    "Project details:",
    clean(data.message),
  ];

  return lines.join("\n");
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const missingConfig = getMissingConfig();
  if (missingConfig.length > 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "WhatsApp notification is not configured",
        missing: missingConfig,
      }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const endpoint = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: process.env.WHATSAPP_TO_NUMBER,
      type: "text",
      text: {
        preview_url: false,
        body: buildMessage(data),
      },
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "WhatsApp API request failed",
        details: result,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, result }),
  };
};
