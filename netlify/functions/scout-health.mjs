/**
 * GET /scout/health
 *
 * Health check — confirms the function runtime is up and reports which
 * environment variables are configured (without leaking their values).
 * Useful for post-deploy smoke tests and uptime monitoring.
 *
 * Env-var names match what scout-intake, scout-confirm, scout-generate-
 * background, and the lib/* modules actually read. Drift between this
 * list and the real env names produces misleading set:false readings.
 */

export default async () => {
  const env = {
    // External service keys
    ANTHROPIC_API_KEY: maskedStatus(process.env.ANTHROPIC_API_KEY),
    GMAIL_SMTP_USER:   maskedStatus(process.env.GMAIL_SMTP_USER),
    GMAIL_SMTP_PASS:   maskedStatus(process.env.GMAIL_SMTP_PASS),
    EMAIL_FROM_NAME:   maskedStatus(process.env.EMAIL_FROM_NAME),
    EMAIL_FROM_ADDRESS: maskedStatus(process.env.EMAIL_FROM_ADDRESS),
    GHOST_API_URL:     maskedStatus(process.env.GHOST_API_URL),
    GHOST_ADMIN_API_KEY: maskedStatus(process.env.GHOST_ADMIN_API_KEY),
    // Internal HMAC + admin secrets
    NETLIFY_SIGNING_SECRET:  maskedStatus(process.env.NETLIFY_SIGNING_SECRET),
    ADMIN_KEY:               maskedStatus(process.env.ADMIN_KEY),
    INTERNAL_TRIGGER_SECRET: maskedStatus(process.env.INTERNAL_TRIGGER_SECRET),
    // Site config
    PUBLIC_BASE_URL: maskedStatus(process.env.PUBLIC_BASE_URL),
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
