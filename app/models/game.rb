class Game < ApplicationRecord
  belongs_to :user

  def self.sort_score_desc
    Game.all.sort_by{|game| game[:score].to_i}.reverse
  end

  def self.unique_scores(games)
    games.uniq {|game| game[:user_id]}
  end

  def self.leader_board
    sorted = Game.sort_score_desc
    Game.unique_scores(sorted)
  end

    def self.leader_board_data
    names = []
    scores = []
    Game.leader_board.each { |game| names << game.user.name }
    Game.leader_board.each { |game| scores << game.score }
    Game.top5_objects(names,scores)
  end

  def self.top5_objects(names,scores)
    top5=[]
    obj={}
    names.each do |name|
          scores.each do |score|
            if names.index(name) == scores.index(score)
              obj["name"] = name 
              obj["score"] = score.to_i
              top5 << obj 
              obj = {} 
            end 
          end 
        end
        top5.take(5)
       
    end 
end

