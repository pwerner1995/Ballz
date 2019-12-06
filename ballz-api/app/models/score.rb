class Score < ApplicationRecord

  def self.sort
    scores = Score.all
    scores.sort_by{|score| -score.score}
  end

end
