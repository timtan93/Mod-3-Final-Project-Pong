class Game < ApplicationRecord
  belongs_to :user

  def self.sort_score_desc
    Game.all.sort_by{|game| game[:score]}.reverse
  end

  def self.unique_scores(game)
    game.uniq {|game| game[:user_id]}
  end

  def self.leader_board
    sorted = Game.sort_score_desc
    Game.unique_scores(sorted)
  end

  def self.leader_board_data

  end
end
