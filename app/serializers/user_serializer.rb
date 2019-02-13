class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :games
  class GameSerializer < ActiveModel::Serializer
    attributes :user_id, :id, :score

  end


end
