# Structured (JSON) request logs.
#
# Replaces Rails' default multi-line log format with one JSON line per
# request, ready to be shipped to a log aggregator (CloudWatch, Datadog Logs,
# Loki, ELK...). See docs/observability.md.

Rails.application.configure do
  config.lograge.enabled = true
  config.lograge.formatter = Lograge::Formatters::Json.new

  # Keep a few extra fields that are useful for debugging in production.
  config.lograge.custom_options = lambda do |event|
    {
      time: Time.current.iso8601,
      params: event.payload[:params]&.except('controller', 'action'),
      request_id: event.payload[:headers]&.[]('action_dispatch.request_id')
    }
  end
end
