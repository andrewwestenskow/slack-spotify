import React from 'react'
import TrackResults from '../../Components/SearchResults/TrackResults'
import ArtistResults from '../../Components/SearchResults/ArtistResults'
import AlbumResults from '../../Components/SearchResults/AlbumResults'
import { connect } from 'react-redux'

const SearchResultsContainer = props => {
  return (
    <div className="Search-Results-Container">
      <TrackResults
        clearSearch={props.clearSearch}
        access_token={props.auth.access_token}
        deviceId={props.spotify.deviceId}
        results={props.results.tracks}
      />
      <ArtistResults
        clearSearch={props.clearSearch}
        access_token={props.auth.access_token}
        deviceId={props.spotify.deviceId}
        results={props.results.artists}
      />
      <AlbumResults
        clearSearch={props.clearSearch}
        access_token={props.auth.access_token}
        deviceId={props.spotify.deviceId}
        results={props.results.albums}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    spotify: state.spotify,
  }
}

export default connect(mapStateToProps)(SearchResultsContainer)
