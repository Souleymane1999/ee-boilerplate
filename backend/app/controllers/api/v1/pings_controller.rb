module Api
  module V1
    # Minimal example controller: creates and lists Ping records, proving
    # the API -> ActiveRecord -> PostgreSQL path works end to end.
    class PingsController < ApplicationController
      def index
        render json: Ping.order(created_at: :desc).limit(20)
      end

      def create
        ping = Ping.new(status: 'ok')

        if ping.save
          render json: ping, status: :created
        else
          render json: { errors: ping.errors.full_messages }, status: :unprocessable_content
        end
      end
    end
  end
end
