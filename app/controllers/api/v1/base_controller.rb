# frozen_string_literal: true

module Api
  module V1
    # JSON-only base for the mobile/API namespace — JWT auth via
    # `authenticate_user!`, no session, no CSRF token (there's no HTML form
    # to protect here; the token itself is the credential).
    # rubocop:disable Rails/ApplicationController -- deliberately NOT
    # ApplicationController: that one is HTML/session-oriented (CSRF,
    # allow_browser, Devise redirects) and none of that belongs on a JSON API.
    class BaseController < ActionController::Base
      # rubocop:enable Rails/ApplicationController
      skip_forgery_protection
      respond_to :json
    end
  end
end
