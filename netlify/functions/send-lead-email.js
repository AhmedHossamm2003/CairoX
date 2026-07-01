const notificationTo = process.env.LEAD_NOTIFICATION_TO || "cairoxagency@gmail.com";
const notificationFrom =
  process.env.LEAD_NOTIFICATION_FROM || "CairoX Leads <onboarding@resend.dev>";

const clean = (value) => {
  if (typeof value !== "string") return "Not provided";
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Not provided";
};

const escapeHtml = (value) =>
  clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildText = (data) =>
  [
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
  ].join("\n");

const buildHtml = (data) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
    <h2 style="margin: 0 0 16px;">New CairoX project inquiry</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
      <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td>${escapeHtml(data.phone)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 700;">Company</td><td>${escapeHtml(data.company)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 700;">Project type</td><td>${escapeHtml(data.projectType)}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: 700;">Budget</td><td>${escapeHtml(data.budget)}</td></tr>
    </table>
    <h3 style="margin: 24px 0 8px;">Project details</h3>
    <div style="white-space: pre-wrap; padding: 16px; background: #f3f4f6; border-radius: 8px;">${escapeHtml(data.message)}</div>
  </div>
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Email notification is not configured",
        missing: ["RESEND_API_KEY"],
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

  const replyTo = clean(data.email);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: notificationFrom,
      to: [notificationTo],
      reply_to: replyTo === "Not provided" ? undefined : replyTo,
      subject: `New CairoX inquiry from ${clean(data.name)}`,
      text: buildText(data),
      html: buildHtml(data),
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Email API request failed",
        details: result,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, result }),
  };
};
