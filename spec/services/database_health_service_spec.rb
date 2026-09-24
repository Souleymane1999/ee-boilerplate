require 'rails_helper'

RSpec.describe DatabaseHealthService do
  it 'returns true when the database connection is active' do
    expect(described_class.call).to be(true)
  end

  it 'returns false when the connection raises' do
    allow(ActiveRecord::Base).to receive(:connection).and_raise(ActiveRecord::ConnectionNotEstablished)

    expect(described_class.call).to be(false)
  end
end
