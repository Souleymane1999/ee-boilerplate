require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  describe 'POST /users (sign up)' do
    it 'creates a user, signs them in, and redirects to the dashboard' do
      post user_registration_path, params: {
        user: { email: 'new@example.com', password: 'password123', password_confirmation: 'password123' }
      }

      expect(response).to redirect_to(dashboard_path)
      expect(User.find_by(email: 'new@example.com')).to be_present
    end

    it 'rejects a too-short password' do
      post user_registration_path, params: {
        user: { email: 'weak@example.com', password: '123', password_confirmation: '123' }
      }

      expect(response).to have_http_status(:unprocessable_content)
      expect(User.find_by(email: 'weak@example.com')).to be_nil
    end
  end

  describe 'POST /users/sign_in and DELETE /users/sign_out' do
    let!(:user) { create(:user, email: 'existing@example.com', password: 'password123') }

    it 'logs in with valid credentials and redirects to the dashboard' do
      post user_session_path, params: { user: { email: user.email, password: 'password123' } }

      expect(response).to redirect_to(dashboard_path)
    end

    it 'rejects an invalid password and re-renders the sign-in form' do
      post user_session_path, params: { user: { email: user.email, password: 'wrong' } }

      expect(response).to have_http_status(:unprocessable_content)
    end

    it 'logs out and blocks access to the dashboard afterwards' do
      post user_session_path, params: { user: { email: user.email, password: 'password123' } }
      delete destroy_user_session_path

      get dashboard_path
      expect(response).to redirect_to(new_user_session_path)
    end
  end

  describe 'GET /dashboard' do
    it 'redirects to sign in when not authenticated' do
      get dashboard_path

      expect(response).to redirect_to(new_user_session_path)
    end

    it 'renders the dashboard when authenticated' do
      user = create(:user)
      sign_in user

      get dashboard_path

      expect(response).to have_http_status(:ok)
      expect(response.body).to include(user.email)
    end
  end
end
