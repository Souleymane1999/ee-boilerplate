class ApplicationController < ActionController::API
  # Devise calls `set_flash_message!` internally (e.g. on sign up/sign in)
  # even though this API never renders flash messages — ActionController::API
  # doesn't include the Flash module by default, so without this Devise raises
  # NameError: undefined local variable or method `flash'.
  include ActionController::Flash
end
