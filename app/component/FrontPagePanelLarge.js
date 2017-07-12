import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import NearbyTabLabel from './NearbyTabLabel';
import FavouritesTabLabelContainer from './FavouritesTabLabelContainer';
import ComponentUsageExample from './ComponentUsageExample';
import ModeFilter from './ModeFilter';

const FrontPagePanelLarge = ({ selectedPanel, nearbyClicked,
   favouritesClicked, children }) => {
  const tabClasses = ['bp-large', 'h4'];
  const nearbyClasses = ['nearby-routes'];
  const favouritesClasses = ['favourites'];

  if (selectedPanel === 1) {
    nearbyClasses.push('selected');
  } else {
    favouritesClasses.push('selected');
  }

  console.log(children);

  return (
     <div className={'fpcfloat no-select'}>
       <ul className="tabs-row bp-large cursor-pointer">
         <NearbyTabLabel
           classes={cx(tabClasses, nearbyClasses)}
           onClick={nearbyClicked}
         />
         <FavouritesTabLabelContainer
           classes={cx(tabClasses, favouritesClasses)}
           onClick={favouritesClicked}
         />
       </ul>
       {children}
     </div>
  );
};


const noop = () => {};

FrontPagePanelLarge.displayName = 'FrontPagePanelLarge';

FrontPagePanelLarge.description = () =>
  <div>
    <p>
      Front page tabs for large display.
    </p>
    <div style={{ width: '340px' }}>
      <ComponentUsageExample description="Front page tabs">
        <FrontPagePanelLarge selectedPanel={2} nearbyClicked={noop} favouritesClicked={noop} />
      </ComponentUsageExample>
    </div>
  </div>;

FrontPagePanelLarge.propTypes = {
  selectedPanel: PropTypes.number.isRequired,
  nearbyClicked: PropTypes.func.isRequired,
  favouritesClicked: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FrontPagePanelLarge.defaultProps = {
  selectedPanel: 1,
};

export default FrontPagePanelLarge;
