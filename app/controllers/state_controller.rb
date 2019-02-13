# @@state = 180
class StateController < ApplicationController
  def index
    render json:{paddleOneY: @@state}
  end

  def edit
     @@state = params[:paddleOneY]
  end

  def pong
    render :pong
  end
end
