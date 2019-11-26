import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PlayWidget from '../PlayWidget/PlayWidget'
import AlbumTrack from './AlbumTrack'
import * as Icon from 'react-feather'
import analyze from 'rgbaster'

const Album = props => {
  const { info } = props
  const mappedTracks = info.tracks.formatted.map((disc, index) => {
    return (
      <div key={index} className="album-track-list-disc">
        <div className="album-track-list-label-hold">
          <Icon.Disc />
          <div className="album-track-list-disc-label">{index + 1}</div>
        </div>
        <div className="album-track-list">
          {disc.map(element => {
            const trackNumber = info.tracks.items.findIndex(
              listItem => listItem.id === element.id
            )
            return (
              <AlbumTrack
                trackNumber={trackNumber}
                access_token={props.access_token}
                deviceId={props.deviceId}
                context={info.uri}
                key={element.id}
                info={element}
              />
            )
          })}
        </div>
      </div>
    )
  })

  const [gradient, setGradient] = useState('#000000')

  const style = {
    // background: `transparent`,
    // backgroundImage: `linear-gradient(to left, transparent 86%, ${gradient} 99%)`,
    boxShadow: `8px -4px 15px -1px ${gradient}`,
  }

  useEffect(() => {
    analyze(info.images[0].url, { scale: 0.5 }).then(result => {
      setGradient(result[0].color)
    })
  }, [gradient, info])

  return (
    <div className="Album">
      <div className="album-info">
        <div
          className="album-info-image"
          style={{ ...style, backgroundImage: `url(${info.images[0].url})` }}
          alt=""
        >
          <PlayWidget
            type="album"
            id={info.id}
            inLibrary={info.inLibrary}
            showMore={true}
            offset={0}
            uri={info.uri}
            toggleChange={props.toggleChange}
            access_token={props.access_token}
            deviceId={props.deviceId}
          />
        </div>
        <div className="album-info-text">
          <div className="album-info-top">
            <p className="album-info-title">{info.name}</p>
            <Link
              to={`/user/spotify/artist/${info.artists[0].id}`}
              className="album-info-artist"
            >
              {info.artists[0].name}
            </Link>
          </div>
          <div className="album-info-bottom">
            <p className="album-info-release">
              {info.release_date.slice(0, 4)}
            </p>
            <p className="album-info-track-count">{`${
              info.tracks.items.length
            } track${info.tracks.items.length === 1 ? '' : 's'}`}</p>
            <p className="album-info-length">{info.length}</p>
          </div>
        </div>
      </div>
      <div className="album-track-list-hold">{mappedTracks}</div>
    </div>
  )
}
export default Album
