import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';

import StopMarker from '../non-tile-layer/StopMarker';
import StopCardHeaderContainer from '../../StopCardHeaderContainer';
import LocationMarker from '../LocationMarker';
import Line from '../Line';

import { isBrowser } from '../../../util/browser';
var util = require('util')

class RouteLine extends React.Component {
  static propTypes = {
    pattern: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    thin: PropTypes.bool,
    filteredStops: PropTypes.array,
  }

  render() {
    if (!isBrowser || !this.props.pattern) {
      return false;
    }

    const objs = [];
    const modeClass = this.props.pattern.route.mode.toLowerCase();

    if (!this.props.thin) {
      // We are drawing a background line under an itinerary line,
      // so we don't want many markers cluttering the map
      objs.push(
        <LocationMarker
          key="from"
          position={this.props.pattern.stops[0]}
          className="from"
        />,
      );

      objs.push(
        <LocationMarker
          key="to"
          position={this.props.pattern.stops[this.props.pattern.stops.length - 1]}
          className="to"
        />,
      );
    }

    const filteredIds = this.props.filteredStops ?
      this.props.filteredStops.map(stop => stop.stopId) : [];

    const markers = this.props.pattern ?
      this.props.pattern.stops
        .filter(stop => !filteredIds.includes(stop.gtfsId))
        .map(stop => (
          <StopMarker
            stop={stop}
            key={stop.gtfsId}
            mode={modeClass + (this.props.thin ? ' thin' : '')}
            thin={this.props.thin}
          />
        ))
      : false;

    const geometry = [];
    this.props.pattern.route.patterns.forEach((pattern) => {
      if (pattern.geometry != null) {
        geometry.push(pattern.geometry);
      }
    });

    return (
      <div style={{ display: 'none' }}>
        {objs}
        <Line
          key="line"
          color={this.props.pattern.route.color ? `#${this.props.pattern.route.color}` : null}
          geometry={geometry || this.props.pattern.stops}
          mode={modeClass}
          thin={this.props.thin}
        />
        {markers}
      </div>
    );
  }
}

export default Relay.createContainer(RouteLine, {
  fragments: {
    pattern: () => Relay.QL`
      fragment on Pattern {
        geometry {
          lat
          lon
        }
        route {
          mode
          color
          patterns {
            geometry {
              lat
              lon
            }
          }
        }
        stops {
          lat
          lon
          name
          gtfsId
          platformCode
          ${StopCardHeaderContainer.getFragment('stop')}
        }
      }
    `,
  },
});
