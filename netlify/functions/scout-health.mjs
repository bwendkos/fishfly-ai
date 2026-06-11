/**
 * GET /health
 *
 * Simple health check — confirms the function runtime is up and reports
 * which environment variables are configured (without leaking their values).
 * Useful for post-deploy smoke tests and uptime monitoring.
 */

export default async () => {
  const env = {
    ANTHROPIC_API_KEY: maskedStatus(process.env.ANTHROPIC_API_KEY),
    GMAIL_SMTP_USER: maskedStatus(process.env.GMAIL_SMTP_USER),
    GMAIL_SMTP_PASS: maskedStatus(process.env.GMAIL_SMTP_PASS),
    SENDER_EMAIL: maskedStatus(process.env.SENDER_EMAIL),
    NETLIFY_SIGNING_SECRET: maskedStatus(process.env.NETLIFY_SIGNING_SECRET),
    AMAZON_AFFILIATE_TAG: maskedStatus(process.env.AMAZON_AFFILIATE_TAG),
    GHOST_ADMIN_URL: maskedStatus(process.env.GHOST_ADMIN_URL),
    GHOST_ADMIN_KEY: maskedStatus(process.env.GHOST_ADMIN_KEY),
    PUBLIC_BASE_URL: maskedStatus(process.env.PUBLIC_BASE_URL),
    INTERNAL_TRIGGER_SECRET: maskedStatus(process.env.INTERNAL_TRIGGER_SECRET),
  };

  return new Response(
    JSON.stringify(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        env,
      },
      null,
      2
    ),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

function maskedStatus(value) {
  if (!value) return { set: false };
  return { set: true, length: value.length };
}
