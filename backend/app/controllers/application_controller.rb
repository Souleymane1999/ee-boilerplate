class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  protected

  def after_sign_in_path_for(_resource)
    dashboard_path
  end

  def after_sign_up_path_for(_resource)
    dashboard_path
  end
end
