# frozen_string_literal: true

module Api
  module V1
    # GET /api/v1/me — protected example endpoint proving the JWT actually
    # authenticates a request end-to-end (Authorization: Bearer <token>).
    class MeController < BaseController
      before_action :authenticate_user!

      def show
        render json: { id: current_user.id, email: current_user.email }, status: :ok
      end
    end
  end
end
