const axios = require('axios')

module.exports = {
  refreshToken: async callback => {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
    const refreshAuth = await axios.post('/refresh', {
      access_token,
      refresh_token,
    })
    localStorage.setItem('access_token', refreshAuth.data.access_token)
    if (refreshAuth.data.refresh_token) {
      localStorage.setItem('refresh_token', refreshAuth.data.refresh_token)
    }
  },
}
