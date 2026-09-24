class ApplicationController < ActionController::Base
  include Pundit::Authorization

  allow_browser versions: :modern

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  protected

  def after_sign_in_path_for(_resource)
    dashboard_path
  end

  def after_sign_up_path_for(_resource)
    dashboard_path
  end

  private

  def user_not_authorized
    redirect_to(request.referer || root_path, alert: "Vous n'êtes pas autorisé(e) à faire cela.")
  end
end
