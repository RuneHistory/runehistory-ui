import rh from '../client'

export const getLatestHighScore = slug => rh.accounts().highScores(slug).getLatestHighScore()
export const getHighScores = (slug, dateRange, skills) => {
  rh.accounts().highScores(slug).getHighScores(dateRange.from, dateRange.to, skills)
}
