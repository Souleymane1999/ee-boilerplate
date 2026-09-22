# Error tracking with Sentry.
#
# No-op if SENTRY_DSN is not set (e.g. local development or CI), so the app
# boots and runs fine without requiring a Sentry account.
#
# See docs/observability.md for how to configure Sentry for a real project.

if ENV["SENTRY_DSN"].present?
  Sentry.init do |config|
    config.dsn = ENV["SENTRY_DSN"]
    config.breadcrumbs_logger = [ :active_support_logger, :http_logger ]

    # Adjust this in production to balance visibility vs Sentry quota/cost.
    config.traces_sample_rate = 0.1

    config.environment = ENV.fetch("RAILS_ENV", "development")
  end
end
