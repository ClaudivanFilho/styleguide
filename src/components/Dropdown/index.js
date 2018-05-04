import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArrowDownIcon from './ArrowDownIcon'
import config from 'vtex-tachyons/config.json'

class Dropdown extends Component {
  handleChange = e => {
    const { disabled, onChange } = this.props
    const { target: { value } } = e

    !disabled && onChange && onChange(e, value)
  }

  getValueLabel() {
    const option = this.props.options.find(
      option => option.value === this.props.value
    )
    if (!option) return null
    return option.label
  }

  render() {
    const {
      label,
      id,
      value,
      size,
      disabled,
      options,
      error,
      errorMessage,
      helpText,
      placeholder,
      preventTruncate,
      autoFocus,
      form,
      name,
      required,
    } = this.props

    let width
    let iconSize

    let classes = 'bg-transparent bn w-100 '
    let containerClasses = 'br2 bw1 relative '
    let selectClasses = 'o-0 absolute top-0 left-0 w-100 bottom-0 '

    const valueLabel = this.getValueLabel()
    const showCaption = !valueLabel

    classes += disabled ? 'bg-light-gray ' : 'pointer '
    selectClasses += disabled ? '' : 'pointer '
    classes += !disabled && valueLabel ? 'c-base-1 ' : 'gray '

    switch (size) {
      case 'large':
        classes += 'f5 pv4 pl6 pr5 '
        selectClasses += 'f5 '
        iconSize = 18
        break
      case 'x-large':
        classes += 'f4 pv5 pl7 pr6 '
        selectClasses += 'f4 '
        iconSize = 22
        break
      default:
        classes += 'f6 pv3 pl5 pr4 '
        selectClasses += 'f6 '
        iconSize = 16
        break
    }

    const containerStyle = { width }

    if (disabled) {
      containerClasses += 'bg-light-gray '
    } else {
      containerClasses += 'bg-base-1 '
    }

    if (error || errorMessage) {
      containerClasses += 'ba b--danger hover-b--danger '
    } else {
      containerClasses += 'ba b--base-2 '
    }

    if (!disabled) {
      containerClasses += 'hover-b--base-2 '
    }

    return (
      <div className="vtex-dropdown">
        <label>
          {label && (
            <span className="vtex-dropdown__label dib mb3 w-100">
              {label}
            </span>
          )}
          <div className={containerClasses} style={containerStyle}>
            <div
              id={id}
              className={`vtex-dropdown__button ${classes}`}
            >
              <div className="flex">
                <div className="vtex-dropdown__caption flex-auto tl truncate">
                  {showCaption ? placeholder : valueLabel}
                </div>
                <div className="vtex-dropdown__arrow flex-none flex items-center pl2">
                  <ArrowDownIcon
                    size={iconSize}
                    color={
                      disabled ? config.colors['gray'] : config.colors.blue
                    }
                  />
                </div>
              </div>
            </div>

            <select
              disabled={disabled}
              className={selectClasses}
              onChange={this.handleChange}
              value={value}
              autoFocus={autoFocus}
              form={form}
              name={name}
              required={required}
              style={{
                // safari select height fix
                WebkitAppearance: 'menulist-button',
              }}
            >
              {preventTruncate && (
                <optgroup label={label || helpText || placeholder || ''}></optgroup>
              )}
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

          </div>
        </label>
        {errorMessage && (
          <div className="c-danger f6 mt3 lh-title">{errorMessage}</div>
        )}
        {helpText && (
          <div className="c-base-3 f6 mt3 lh-title">{helpText}</div>
        )}
      </div>
    )
  }
}

Dropdown.defaultProps = {
  size: 'regular',
  options: [],
}

Dropdown.propTypes = {
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.node,
  /** Help text */
  helpText: PropTypes.node,
  /** Dropdown label */
  label: PropTypes.node,
  /** Dropdown placeholder value */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Dropdown size */
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  /** Dropdown options list */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  /** Prevent truncating large options texts on some devices/browsers, such as iOS */
  preventTruncate: PropTypes.bool,
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  autoFocus: PropTypes.bool,
  /** Spec attribute */
  value: PropTypes.string,
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** Spec attribute */
  form: PropTypes.string,
  /** Spec attribute */
  name: PropTypes.string,
  /** Spec attribute */
  required: PropTypes.bool,
  /** onChange event */
  onChange: PropTypes.func,
  /** onClose event */
  onClose: PropTypes.func,
  /** onOpen event */
  onOpen: PropTypes.func,
}

export default Dropdown
