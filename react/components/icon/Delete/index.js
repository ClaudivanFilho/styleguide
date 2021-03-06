import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Delete extends PureComponent {
  render() {
    const { color, size } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 0H0V6H2V0Z" transform="translate(5 7)" fill={color} />
        <path d="M2 0H0V6H2V0Z" transform="translate(9 7)" fill={color} />
        <path
          d="M12 1C12 0.4 11.6 0 11 0H5C4.4 0 4 0.4 4 1V3H0V5H1V15C1 15.6 1.4 16 2 16H14C14.6 16 15 15.6 15 15V5H16V3H12V1ZM6 2H10V3H6V2ZM13 5V14H3V5H13Z"
          fill={color}
        />
      </svg>
    )
  }
}

Delete.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Delete.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Delete
