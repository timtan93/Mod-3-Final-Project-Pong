class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end
  def create
    @user = User.new(name: params[:name], )
    if @user.save
      render json: @user
    else
      render json: {error: 'Unable to create user.'}, status: 400
    end
  end

end

# fetch('http://localhost:3000/users', {
#     method: 'POST',
#     headers: { 'Content-Type': 'application/json' },
#     body: JSON.stringify({name: "Harry"})
# })
  # games.sort(function(a, b){return b.score - a.score})
  # unique = [...new Set(sorted.map(game => game.user_id))]
#   function doIt() {
# let newA = []
# 	for (let i = 0; i < sorted.length; i++) {
#
# 	if (map[sorted[i].user_id]) {
# } else {
#
# 	map[sorted[i].user_id] = 'done'
# 	newA.push(sorted[i])
#
# }
#
# }
# return newA
# }
