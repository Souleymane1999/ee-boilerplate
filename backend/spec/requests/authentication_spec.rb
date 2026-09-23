require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  describe 'POST /signup' do
    it 'creates a user and returns a JWT in the Authorization header' do
      post '/signup', params: {
        user: { email: 'new@example.com', password: 'password123', password_confirmation: 'password123' }
      }

      expect(response).to have_http_status(:created)
      expect(response.headers['Authorization']).to match(/^Bearer /)
      expect(response.parsed_body['user']['email']).to eq('new@example.com')
    end

    it 'rejects a too-short password' do
      post '/signup', params: {
        user: { email: 'weak@example.com', password: '123', password_confirmation: '123' }
      }

      expect(response).to have_http_status(:unprocessable_content)
    end
  end

  describe 'POST /login and DELETE /logout' do
    let!(:user) { create(:user, email: 'existing@example.com', password: 'password123') }

    it 'logs in with valid credentials and returns a usable JWT' do
      post '/login', params: { user: { email: user.email, password: 'password123' } }

      expect(response).to have_http_status(:ok)
      expect(response.headers['Authorization']).to match(/^Bearer /)
    end

    it 'rejects an invalid password' do
      post '/login', params: { user: { email: user.email, password: 'wrong' } }

      expect(response).to have_http_status(:unauthorized)
    end

    it "revokes the JWT on logout so it can't be reused" do
      post '/login', params: { user: { email: user.email, password: 'password123' } }
      token = response.headers['Authorization']

      delete '/logout', headers: { 'Authorization' => token }
      expect(response).to have_http_status(:ok)

      delete '/logout', headers: { 'Authorization' => token }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
