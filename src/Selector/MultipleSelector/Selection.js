import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toTitle, UNSELECTABLE_ATTRIBUTE, UNSELECTABLE_STYLE } from '../../util';

class Selection extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    maxTagTextLength: PropTypes.number,
    onRemove: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,

    label: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    removeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  };

  onRemove = event => {
    event.stopPropagation();
    const { onRemove, value,label } = this.props;
    onRemove(event, label,value);
  };

  render() {
    const {
      prefixCls,
      maxTagTextLength,
      className,
      style,
      label,
      value,
      onRemove,
      removeIcon,
    } = this.props;

    let content = value || label;
    if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
      content = `${content.slice(0, maxTagTextLength)}...`;
    }

    return (
      <li
        style={{ ...UNSELECTABLE_STYLE, ...style }}
        {...UNSELECTABLE_ATTRIBUTE}
        role="menuitem"
        className={classNames(`${prefixCls}-selection__choice`, className)}
        title={toTitle(value || label)}
      >
        <span className={`${prefixCls}-selection__choice__content`}>{content}</span>
        {onRemove && (
          <span className={`${prefixCls}-selection__choice__remove`} onClick={this.onRemove}>
            {typeof removeIcon === 'function'
              ? React.createElement(removeIcon, { ...this.props })
              : removeIcon}
          </span>
        )}
      </li>
    );
  }
}

export default Selection;
