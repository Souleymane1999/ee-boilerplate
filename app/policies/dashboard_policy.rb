# frozen_string_literal: true

# Example Pundit policy — the pattern used in 3/3 of the team's real Rails
# apps (ipay-money-app, financial-ipay, i-money-app) for authorization.
# Dashboard isn't an ActiveRecord model, so it's authorized against the
# `:dashboard` symbol rather than a record — see DashboardController#show.
class DashboardPolicy < ApplicationPolicy
  def show?
    user.present?
  end
end
