import React from 'react'
import { connect } from 'react-redux'

const ContextMenu = ({ x, y }) => {
  return (
    <div
      style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}
      className="context-menu"
    >
      DO SOMETHING
    </div>
  )
}

const mapStateToProps = (state) => state.contextMenu

export default connect(mapStateToProps)(ContextMenu)
