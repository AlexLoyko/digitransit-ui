import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';
import config from '../configurations/config.default';
import { displayImperialDistance } from '../util/geo-utils';


const round = (distance) => {
  if (distance < 1000) return distance - (distance % 10);
  return distance - (distance % 100);
};

// function displayImperialDistance(meters) {
//   const feet = meters * 3.2808399;

//   /* eslint-disable yoda */

//   if (feet < 100) {
//     return `${Math.round(feet / 10) * 10} ft`; // Tens of feet
//   } else if (feet < 1000) {
//     return `${Math.round(feet / 50) * 50} ft`; // fifty feet
//   }
//   return `${(Math.round(feet / 528)) / 10} mi`; // tenth of a mile
// }


const Distance = (props) => {
  let distance;
  let roundedDistance;

  if (props.distance) {
    roundedDistance = round(props.distance);
    if (config.imperial) {
      distance = displayImperialDistance(props.distance);
    } else if (roundedDistance < 1000) {
      distance = `${roundedDistance}m`;
    } else {
      distance = `${(roundedDistance / 1000).toFixed(1)}km`;
    }
  } else distance = '';

  return <span className="distance">{distance}</span>;
};

Distance.description = () =>
  <div>
    <p>Display distance in correct format. Rounds to 10s of meters
      or if above 1000 then shows kilometers with one decimal.
    </p>
    <ComponentUsageExample description="distance is rounded down">
      <Distance distance={7} />
    </ComponentUsageExample>
    <ComponentUsageExample description="distance">
      <Distance distance={123} />
    </ComponentUsageExample>
    <ComponentUsageExample description="distance in km">
      <Distance distance={3040} />
    </ComponentUsageExample>
  </div>;

Distance.propTypes = {
  distance: React.PropTypes.number.isRequired,
};

Distance.displayName = 'Distance';

export { Distance as default, round };
