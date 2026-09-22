class CreatePings < ActiveRecord::Migration[7.2]
  def change
    create_table :pings do |t|
      t.string :status

      t.timestamps
    end
  end
end
