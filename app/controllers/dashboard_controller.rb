class DashboardController < ApplicationController
  before_action :authenticate_user!

  def show
    authorize :dashboard
    @database_connected = DatabaseHealthService.call
  end
end
