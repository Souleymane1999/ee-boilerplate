# frozen_string_literal: true

module Users
  # Overrides Devise's SessionsController to respond with JSON instead of
  # HTML redirects, since this is an API-only app consumed by the React frontend.
  # The actual JWT is added to the Authorization header by devise-jwt
  # (see config.jwt.dispatch_requests in config/initializers/devise.rb) — this
  # controller only needs to shape the JSON body around it.
  class SessionsController < Devise::SessionsController
    respond_to :json

    private

    def respond_with(resource, _opts = {})
      render json: { user: user_payload(resource) }, status: :ok
    end

    # Devise::SessionsController#destroy already calls sign_out before this is
    # reached, so current_user is always nil here — that's not a useful signal.
    # non_navigational_status is what actually distinguishes the two cases:
    # :no_content (successful sign_out) vs :unauthorized (verify_signed_out_user
    # already found no active session for any Devise scope).
    def respond_to_on_destroy(non_navigational_status: :no_content)
      if non_navigational_status == :unauthorized
        render json: { message: 'Aucune session active.' }, status: :unauthorized
      else
        render json: { message: 'Déconnecté avec succès.' }, status: :ok
      end
    end

    def user_payload(user)
      { id: user.id, email: user.email }
    end
  end
end
