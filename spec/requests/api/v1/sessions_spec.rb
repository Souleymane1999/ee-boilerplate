require 'rails_helper'

RSpec.describe 'Api::V1 authentication (JWT)', type: :request do
  let!(:user) { create(:user, password: 'password123') }

  describe 'POST /api/v1/login' do
    it 'returns a JWT in the Authorization header on valid credentials' do
      post '/api/v1/login', params: { user: { email: user.email, password: 'password123' } }

      expect(response).to have_http_status(:ok)
      expect(response.headers['Authorization']).to match(/^Bearer /)
    end

    it 'rejects an invalid password' do
      post '/api/v1/login', params: { user: { email: user.email, password: 'wrong' } }

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'GET /api/v1/me' do
    it 'returns 401 JSON without a token' do
      get '/api/v1/me'

      expect(response).to have_http_status(:unauthorized)
      expect(response.content_type).to include('application/json')
    end

    it "returns the current user's info with a valid token" do
      post '/api/v1/login', params: { user: { email: user.email, password: 'password123' } }
      token = response.headers['Authorization']

      get '/api/v1/me', headers: { 'Authorization' => token }

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['email']).to eq(user.email)
    end
  end

  describe 'DELETE /api/v1/logout' do
    it 'revokes the token so it can no longer be used' do
      post '/api/v1/login', params: { user: { email: user.email, password: 'password123' } }
      token = response.headers['Authorization']

      delete '/api/v1/logout', headers: { 'Authorization' => token }
      expect(response).to have_http_status(:ok)

      get '/api/v1/me', headers: { 'Authorization' => token }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
