import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

function Icon(props) {
  if (props.img === 'icon-farecard-mta' || props.img === 'icon-farecard-mtasbwy' || props.img === 'icon-farecard-path') {
    return (
      <span aria-hidden>
        <svg width="80" height="80" viewBox="0 0 142.75629 90.285438">
          <use xlinkHref={`#${props.img}`} />
        </svg>
      </span>
    );
  }

  return (
    <span aria-hidden>
      <svg id={props.id} viewBox={props.viewBox} className={cx('icon', props.className)} style={{ fill: props.color ? props.color : null }} >
        <use xlinkHref={`#${props.img}`} />
      </svg>
    </span>
  );
}

Icon.propTypes = {
  id: React.PropTypes.string,
  viewBox: React.PropTypes.string,
  color: React.PropTypes.string,
  className: React.PropTypes.string,
  img: React.PropTypes.string.isRequired,
};

Icon.defaultProps = {
  viewBox: '0 0 40 40',
};

Icon.asString = (img, className, id) => `
  <span>
    <svg${id ? ` id=${id}` : ''} viewBox="0 0 40 40" class="${cx('icon', className)}">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${img}"/>
    </svg>
  </span>
`;

Icon.displayName = 'Icon';
Icon.description = 'Shows an icon from the SVG sprite';
export default Icon;
