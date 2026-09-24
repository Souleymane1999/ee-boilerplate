# frozen_string_literal: true

module Api
  module V1
    # POST /api/v1/login, DELETE /api/v1/logout — issues/revokes a JWT
    # instead of Devise's default HTML redirect. The token itself is
    # attached to the response by devise-jwt (see config.jwt.dispatch_requests
    # in config/initializers/devise.rb) — this controller only shapes the
    # JSON body around it.
    class SessionsController < Devise::SessionsController
      skip_forgery_protection
      respond_to :json

      # Devise's own `verify_signed_out_user` (which checks
      # `warden.user(scope:, run_callbacks: false)`) is built for
      # cookie-session apps and doesn't reliably see a JWT-only request as
      # signed in. `authenticate_user!` runs the :jwt Warden strategy
      # properly and 401s (via JsonOrHtmlFailureApp) on an invalid/missing
      # token — the token is still revoked afterwards by devise-jwt's
      # RevocationManager middleware regardless of what this controller does.
      # destroy is inherited from Devise::SessionsController, not defined
      # here — rubocop's lexical scan can't see it, but :only is still correct.
      # rubocop:disable Rails/LexicallyScopedActionFilter
      skip_before_action :verify_signed_out_user, only: :destroy
      before_action :authenticate_user!, only: :destroy
      # rubocop:enable Rails/LexicallyScopedActionFilter

      private

      def respond_with(resource, _opts = {})
        render json: { user: { id: resource.id, email: resource.email } }, status: :ok
      end

      def respond_to_on_destroy(non_navigational_status: :no_content) # rubocop:disable Lint/UnusedMethodArgument
        render json: { message: 'Déconnecté(e) avec succès.' }, status: :ok
      end
    end
  end
end
