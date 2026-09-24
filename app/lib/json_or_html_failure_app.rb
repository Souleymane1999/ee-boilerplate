# frozen_string_literal: true

# Devise's default failure app always issues an HTML redirect — correct for
# the web session login (/users/sign_in), but wrong for the JWT-based
# /api/v1/* endpoints, which have no login page to redirect to and expect a
# plain JSON 401. Routes by path prefix rather than Accept header, since a
# mobile client's Accept header isn't reliable enough to branch on.
class JsonOrHtmlFailureApp < Devise::FailureApp
  def respond
    # request.path here is Devise's internal "/unauthenticated" stand-in
    # path, not the path the client actually requested — that one lives in
    # warden.options[:attempted_path] (exposed by Devise as `attempted_path`).
    if attempted_path.to_s.start_with?('/api/')
      self.status = 401
      self.content_type = 'application/json'
      self.response_body = { error: i18n_message }.to_json
    else
      super
    end
  end
end
