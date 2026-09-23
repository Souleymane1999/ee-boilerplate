require 'rails_helper'

RSpec.describe User, type: :model do
  it 'has a valid factory' do
    expect(build(:user)).to be_valid
  end

  it 'requires a unique email' do
    create(:user, email: 'dup@example.com')
    expect(build(:user, email: 'dup@example.com')).not_to be_valid
  end

  it 'requires a password' do
    expect(build(:user, password: nil)).not_to be_valid
  end
end
