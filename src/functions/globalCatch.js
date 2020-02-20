import axios from 'axios'

export default async (access_token, refresh_token, optionsObj) => {
  const {
    data: {
      refreshSpotifyAuth: {
        access_token: updatedAccessToken,
        refresh_token: updatedRefreshToken,
      },
    },
  } = await axios.post('/refresh', { access_token, refresh_token })

  const returnObj = {
    updatedOptions: {
      ...optionsObj,
      headers: {
        ...optionsObj.headers,
        Authorization: `Bearer ${updatedAccessToken}`,
      },
    },
    updatedAuth: {
      access_token: updatedAccessToken,
      refresh_token: updatedRefreshToken || refresh_token,
    },
  }
  console.log(returnObj)
  return returnObj
}
