require 'rails_helper'

RSpec.describe Ping, type: :model do
  describe 'validations' do
    it 'is valid with status ok' do
      expect(described_class.new(status: 'ok')).to be_valid
    end

    it 'is invalid without a status' do
      expect(described_class.new(status: nil)).not_to be_valid
    end

    it 'is invalid with a status other than ok' do
      expect(described_class.new(status: 'nope')).not_to be_valid
    end
  end
end
