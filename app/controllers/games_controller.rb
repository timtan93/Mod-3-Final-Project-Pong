class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def show
    @game = Game.find(params[:id])
    render json: @game
  end

  def create
    @game = Game.new(score: params[:score], user_id: params[:user_id] )
    if @game.save
      render json: @game
    else
      render json: {error: 'Unable to create game.'}, status: 400
    end
  end

  def leaders 
    @leaders = Game.leader_board_data
    render json: @leaders
  end 


end

# fetch('http://localhost:3000/games').then(resp => resp.json()).then(console.log)
