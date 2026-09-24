require 'rails_helper'

RSpec.describe '/todos', type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }

  describe 'GET /todos' do
    it 'redirects to sign in when not authenticated' do
      get todos_path

      expect(response).to redirect_to(new_user_session_path)
    end

    it "only lists the current user's todos" do
      sign_in user
      mine = create(:todo, user: user, title: 'Mine')
      create(:todo, user: other_user, title: 'Not mine')

      get todos_path

      expect(response.body).to include(mine.title)
      expect(response.body).not_to include('Not mine')
    end
  end

  describe 'POST /todos' do
    it 'creates a todo owned by the current user' do
      sign_in user

      expect do
        post todos_path, params: { todo: { title: 'New task' } }
      end.to change(Todo, :count).by(1)

      expect(Todo.last.user).to eq(user)
      expect(response).to redirect_to(todo_path(Todo.last))
    end

    it 'rejects a blank title' do
      sign_in user

      expect do
        post todos_path, params: { todo: { title: '' } }
      end.not_to change(Todo, :count)

      expect(response).to have_http_status(:unprocessable_content)
    end
  end

  describe 'GET /todos/:id' do
    it "blocks access to another user's todo" do
      sign_in user
      todo = create(:todo, user: other_user)

      get todo_path(todo)

      expect(response).to redirect_to(root_path).or redirect_to(dashboard_path)
    end

    it "allows access to the current user's todo" do
      sign_in user
      todo = create(:todo, user: user)

      get todo_path(todo)

      expect(response).to be_successful
    end
  end

  describe 'PATCH /todos/:id' do
    it "updates the current user's todo" do
      sign_in user
      todo = create(:todo, user: user, done: false)

      patch todo_path(todo), params: { todo: { done: true } }

      expect(todo.reload.done).to be true
    end

    it "blocks updating another user's todo" do
      sign_in user
      todo = create(:todo, user: other_user, title: 'Untouched')

      patch todo_path(todo), params: { todo: { title: 'Hacked' } }

      expect(todo.reload.title).to eq('Untouched')
    end
  end

  describe 'DELETE /todos/:id' do
    it "destroys the current user's todo" do
      sign_in user
      todo = create(:todo, user: user)

      expect do
        delete todo_path(todo)
      end.to change(Todo, :count).by(-1)
    end

    it "blocks destroying another user's todo" do
      sign_in user
      todo = create(:todo, user: other_user)

      expect do
        delete todo_path(todo)
      end.not_to change(Todo, :count)
    end
  end
end
