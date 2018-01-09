import React from 'react'
import PropTypes from 'prop-types'

const Banner = ({appName}) => {
  return (
    <div>
      <div>
        <h1>
          {appName.toLowerCase()}
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  )
}

Banner.propTypes = {
  appName: PropTypes.string
}

export default Banner
