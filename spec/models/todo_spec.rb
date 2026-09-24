require 'rails_helper'

RSpec.describe Todo, type: :model do
  it 'is invalid without a title' do
    todo = build(:todo, title: nil)

    expect(todo).not_to be_valid
  end

  it 'belongs to a user' do
    todo = build(:todo)

    expect(todo.user).to be_present
  end
end
