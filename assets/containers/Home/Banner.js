import React from 'react'
import PropTypes from 'prop-types'

const Banner = ({appName}) => {
  return (
    <div>
      <h1>
        {appName.toLowerCase()}
      </h1>
    </div>
  )
}

Banner.propTypes = {
  appName: PropTypes.string
}

export default Banner
