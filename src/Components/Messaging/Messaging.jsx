import React from 'react'

const Messaging = props => {
  return (
    <iframe
      title="Android Messages"
      style={{ height: '100%', width: '100%' }}
      src="https://messages.google.com/web/conversations"
      target="_parent"
    ></iframe>
  )
}
export default Messaging
