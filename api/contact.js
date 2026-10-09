const ENQUIRY_TYPES = [
  "Partnership",
  "Investment",
  "Collaboration",
  "Press",
  "SCHOOL — the learning platform",
  "Getting Started NPC / The Pledge",
  "Media · Music · Esports",
  "Something else",
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  if (body["bot-field"]) {
    return res.status(200).json({ ok: true });
  }

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const organisation = (body.organisation || "").toString().trim();
  const enquiryType = ENQUIRY_TYPES.includes(body.enquiry_type) ? body.enquiry_type : "Something else";
  const message = (body.message || "").toString().trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: "Message is too long." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set — enquiry not delivered:", { name, email, enquiryType });
    return res.status(503).json({ error: "Email delivery is not configured yet." });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Ditshego Ventures <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || "moloti@ditshego-ventures.co.za";

  const html = `
    <h2>New enquiry — ${escapeHtml(enquiryType)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Organisation:</strong> ${escapeHtml(organisation || "—")}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Ditshego enquiry (${enquiryType}) — ${name}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text().catch(() => "");
      console.error("contact: Resend send failed", resendResponse.status, detail);
      return res.status(502).json({ error: "Could not send your message. Please email us directly." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("contact: unexpected error", error);
    return res.status(500).json({ error: "Unexpected error sending your message." });
  }
};