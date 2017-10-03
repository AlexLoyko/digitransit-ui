import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import cx from 'classnames';
import _ from 'lodash';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import { routePatterns as exampleRoutePatterns } from './ExampleData';

function RoutePatternSelect(props) {
  // const options = props.route && props.route.patterns.map(pattern =>
  //   (<option key={pattern.code} value={pattern.code}>
  //     {pattern.stops[0].name} ➔ {pattern.trips.tripsForDate.tripHeadsign}
  //   </option>));

  let used = [];
  let options = [];
  const mostPopPatterns = {};

  for (let i = 0; i < props.route.patterns.length; i++) {
    let tripsOnThisPattern = props.route.patterns[i].tripsForDate;
    if (tripsOnThisPattern && tripsOnThisPattern.length > 0) {
      if (!_.includes(used, tripsOnThisPattern[0].tripHeadsign)) {
        used.push(tripsOnThisPattern[0].tripHeadsign);
        mostPopPatterns[tripsOnThisPattern[0].tripHeadsign] = props.route.patterns[i];
      } else {
         if (mostPopPatterns[tripsOnThisPattern[0].tripHeadsign].tripsForDate.length < tripsOnThisPattern.length) {
           mostPopPatterns[tripsOnThisPattern[0].tripHeadsign] = props.route.patterns[i];
         }
      }
    }
  }

  for (var headsign in mostPopPatterns) {
    if (mostPopPatterns.hasOwnProperty(headsign)) {
      options.push(
        <option key={mostPopPatterns[headsign].code} value={mostPopPatterns[headsign].code}>
          {mostPopPatterns[headsign].stops[0].name} ➔ {headsign}
        </option>);
    }
  }
  
  return (
    <div className={cx('route-pattern-select', props.className)}>
      <Icon img="icon-icon_arrow-dropdown" />
      <select onChange={props.onSelectChange} value={props.params && props.params.patternId}>
        {options}
      </select>
    </div>
  );
}

RoutePatternSelect.propTypes = {
  params: PropTypes.object,
  route: PropTypes.object,
  className: PropTypes.string,
  onSelectChange: PropTypes.func.isRequired,
};

RoutePatternSelect.description = () =>
  <div>
    <p>
      Display a dropdown to select the pattern for a route
    </p>
    <ComponentUsageExample>
      <RoutePatternSelect
        pattern={exampleRoutePatterns}
        onSelectChange={() => {}}
      />
    </ComponentUsageExample>
  </div>;

export default Relay.createContainer(RoutePatternSelect, {
  fragments: {
    route: () =>
      Relay.QL`
      fragment on Route {
        patterns {
          code
          tripsForDate(serviceDay: "20171002"){
            tripHeadsign
          }
          stops {
            name
          }
        }
      }
    `,
  },
});
