import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import cx from 'classnames';
import _ from 'lodash';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import { routePatterns as exampleRoutePatterns } from './ExampleData';

var date = new Date();

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + (mmChars[1]?mm:"0"+mmChars[0]) + (ddChars[1]?dd:"0"+ddChars[0]);
}

date = convertDate(date);


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
      if (!_.includes(used, { headsign: tripsOnThisPattern[0].tripHeadsign, firstStop: tripsOnThisPattern[0].stops[0].name })) {
        used.push({
          headsign: tripsOnThisPattern[0].tripHeadsign,
          firstStop: tripsOnThisPattern[0].stops[0].name
        });
        mostPopPatterns[tripsOnThisPattern[0].tripHeadsign] = props.route.patterns[i];
      }
    }
  }

  for (var headsign in mostPopPatterns) {
    if (mostPopPatterns.hasOwnProperty(headsign)) {
      options.push(
        <option key={mostPopPatterns[headsign].code} value={mostPopPatterns[headsign].code}>
          {mostPopPatterns[headsign].tripsForDate[0].stops[0].name} ➔ {headsign}
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
  initialVariables: {
    date,
  },
  fragments: {
    route: () =>
      Relay.QL`
      fragment on Route {
        patterns {
          code
          tripsForDate(serviceDay: $date){
            tripHeadsign
            stops {
              name
            }
          }
          stops {
            name
          }
        }
      }
    `,
  },
});
