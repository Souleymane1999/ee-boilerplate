# frozen_string_literal: true

# Example service object — the pattern used in 3/3 of the team's real Rails
# apps (ipay-money-app, financial-ipay, i-money-app) to keep business logic
# out of controllers and models. A service is a plain Ruby class with one
# job, called via `.call`.
class DatabaseHealthService
  def self.call
    new.call
  end

  def call
    ActiveRecord::Base.connection.active?
  rescue ActiveRecord::ActiveRecordError
    false
  end
end
