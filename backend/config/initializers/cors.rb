# Be sure to restart your server when you modify this file.
#
# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin
# Ajax requests from the frontend.
#
# The allowed origin is read from FRONTEND_URL (see .env.example). Do not use
# a wildcard ("*") in production — always list explicit allowed origins.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch("FRONTEND_URL", "http://localhost:5173")

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
