class ScoresController < ApplicationController
  def index
    scores = Score.sort
    render json: scores.to_json
  end

  def create
    score = Score.create(score_params)
    scores = Score.sort
    render json: scores.to_json
  end

  private
  def score_params
    params["name"].upcase!
    params.permit(:name, :score)
  end
end
