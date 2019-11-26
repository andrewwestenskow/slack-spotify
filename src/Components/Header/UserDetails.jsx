import React from 'react'
import { connect } from 'react-redux'

const UserDetails = props => {
  if (props.user.display_name) {
    return (
      <div className="User-Details">
        <p className="user-name">{props.user.display_name}</p>
        <img
          className="profile-picture"
          src={props.user.images[0].url}
          alt=""
        />
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(UserDetails)
