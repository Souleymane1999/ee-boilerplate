require "rails_helper"

RSpec.describe Ping, type: :model do
  describe "validations" do
    it "is valid with status ok" do
      expect(Ping.new(status: "ok")).to be_valid
    end

    it "is invalid without a status" do
      expect(Ping.new(status: nil)).not_to be_valid
    end

    it "is invalid with a status other than ok" do
      expect(Ping.new(status: "nope")).not_to be_valid
    end
  end
end
