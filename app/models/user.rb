class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  before_create { self.jti = SecureRandom.uuid }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #
  # :jwt_authenticatable powers the JSON API under /api/v1 (see
  # app/controllers/api/v1/sessions_controller.rb) — the web UI still uses
  # ordinary sessions via :database_authenticatable + :rememberable. Same
  # dual pattern as the team's real apps (ipay-money-app, financial-ipay,
  # i-money-app).
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :jwt_authenticatable,
         jwt_revocation_strategy: self
end
