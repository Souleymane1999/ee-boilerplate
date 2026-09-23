require 'rails_helper'

RSpec.describe 'Api::V1::Pings', type: :request do
  describe 'POST /api/v1/pings' do
    it 'creates a ping and returns 201' do
      expect do
        post '/api/v1/pings'
      end.to change(Ping, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(response.parsed_body['status']).to eq('ok')
    end
  end

  describe 'GET /api/v1/pings' do
    it 'returns the list of pings' do
      create(:ping)

      get '/api/v1/pings'

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(1)
    end
  end
end
