const axios = require('axios')
require('dotenv').config()
const {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_SIGNING_SECRET,
  SLACK_REDIRECT_URI,
} = process.env

module.exports = {
  login: async (req, res) => {
    const scope = 'usergroups:read'

    const options = {
      url: `https://slack.com/oath/authorize?client_id=${SLACK_CLIENT_ID}&scope=${scope}&redirect_uri=${SLACK_REDIRECT_URI}`,
      method: 'GET',
    }

    try {
      const result = await axios(options)

      console.log(result)
      res.status(200).send(result)
    } catch (error) {
      res.status(200).send(error)
    }
  },
}
