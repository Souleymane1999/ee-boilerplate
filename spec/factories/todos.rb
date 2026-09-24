FactoryBot.define do
  factory :todo do
    association :user
    title { 'Vérifier le rapprochement bancaire' }
    done { false }
  end
end
