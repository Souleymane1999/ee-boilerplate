# frozen_string_literal: true

# Replaces Devise's default failure app (which issues an HTML redirect) with a
# plain JSON 401 response — appropriate for an API-only backend with no views.
class JsonFailureApp < Devise::FailureApp
  def respond
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = { error: i18n_message }.to_json
  end
end
