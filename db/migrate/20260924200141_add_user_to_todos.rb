class AddUserToTodos < ActiveRecord::Migration[7.2]
  def change
    # rubocop:disable Rails/NotNullColumn -- todos table is created empty in
    # the same PR (see CreateTodos), no existing rows to violate NOT NULL.
    add_reference :todos, :user, null: false, foreign_key: true
    # rubocop:enable Rails/NotNullColumn
  end
end
