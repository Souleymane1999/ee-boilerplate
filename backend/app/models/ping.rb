# A minimal example model used to prove that the API + database
# stack works end to end. Safe to delete once real domain models exist.
class Ping < ApplicationRecord
  validates :status, presence: true, inclusion: { in: %w[ok] }
end
