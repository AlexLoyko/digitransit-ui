import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import SummaryRow from './SummaryRow';
import _ from 'lodash';

function createSummaryRowEntry(itinerary, i) {
  return {
    i,
    itinerary,
  };
}


function ItinerarySummaryListContainer(props) {
  if (props.itineraries && props.itineraries.length > 0) {
    const open = props.open && Number(props.open);
    const uniqueSummaries = {};

    let counter = 0;

    // check if has at least one transit leg and get a route by route sequence per this itinerary
    props.itineraries.forEach((itinerary, i) => {
      let noTransitLegs = true;
      let firstTransitLegIndex;

      /*
        here it's making an actual 'route sequence'
        i.e: Walk, take the B, take the R, Walk will look like
        ['WALK', 'B', 'R', 'WALK']
       */
      const currRoutes = itinerary.legs.map((leg, j) => {
        if (leg.transitLeg) {
            noTransitLegs = false;
            firstTransitLegIndex = j;
        }
        if (leg.route && leg.route.shortName) {
          return leg.route.shortName;
        }
        return leg.mode;
      });

      // we are interested in having unique only summary rows with elegant handling of future available routes
      let found = false;

      // iterate over every field of uniqueSummaries and check if itinerary with same 'route sequence' already saved
      for (var property in uniqueSummaries) {
        if (uniqueSummaries.hasOwnProperty(property)) {

          // once found a matching saved itinerary, if time is reasonable, add it to object's futureTimes
          if (_.isEqual(uniqueSummaries[property], currRoutes)) {
            found = true;
            let originalEntry = uniqueSummaries[property];

            // DO NOT add a scheduled next trip if having a realtime approximation for the current -> leads to inaccuracy
            if (originalEntry.itinerary.itinerary.legs[originalEntry.firstTransitLegIndex].realTime && !itinerary.legs[firstTransitLegIndex].realTime) {
              continue;
            }
            if (!originalEntry.futureTimes) {
              originalEntry.futureTimes = [];
            }
            uniqueSummaries[property].futureTimes = [...uniqueSummaries[property].futureTimes, `${moment(itinerary.legs[firstTransitLegIndex].startTime).format('hh:mm a')}`];
          }
        }
      }

      // if not such itinerary is found, create a traditional entry for it
      if (!found) {
        counter += 1;
        uniqueSummaries[counter] = [...currRoutes];
        uniqueSummaries[counter].firstTransitLegIndex = firstTransitLegIndex;
        uniqueSummaries[counter].itinerary = createSummaryRowEntry(itinerary, i);
      }
    });

    // every object in unique summaries is a separate itinerary
    const summaries = [];
    for (var property in uniqueSummaries) {
        if (uniqueSummaries.hasOwnProperty(property)) {
           let i = uniqueSummaries[property].itinerary.i;
           let itinerary = uniqueSummaries[property].itinerary.itinerary;
           summaries.push(
             <SummaryRow
                 refTime={props.searchTime}
                 key={i} // eslint-disable-line react/no-array-index-key
                 hash={i}
                 data={itinerary}
                 passive={i !== props.activeIndex}
                 currentTime={props.currentTime}
                 onSelect={props.onSelect}
                 onSelectImmediately={props.onSelectImmediately}
                 intermediatePlaces={props.relay.route.params.intermediatePlaces}
                 futureTimes = {uniqueSummaries[property].futureTimes}
             >
               {i === open && props.children}
             </SummaryRow>
           );
        }
    }

    return <div className="summary-list-container momentum-scroll">{summaries}</div>;
  } else if (
    !props.relay.route.params.from.lat || !props.relay.route.params.from.lon ||
    !props.relay.route.params.to.lat || !props.relay.route.params.to.lon
  ) {
    return (
      <div className="summary-list-container summary-no-route-found">
        <FormattedMessage
          id="no-route-start-end"
          defaultMessage={'Please select origin and destination.'}
        />
      </div>
    );
  }
  return (
    <div className="summary-list-container summary-no-route-found">
      <FormattedMessage
        id="no-route-msg"
        defaultMessage={'Unfortunately no routes were found for your journey. ' +
          'Please change your origin or destination address.'}
      />
    </div>
  );
}

ItinerarySummaryListContainer.propTypes = {
  searchTime: PropTypes.number.isRequired,
  itineraries: PropTypes.array,
  activeIndex: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectImmediately: PropTypes.func.isRequired,
  open: PropTypes.number,
  children: PropTypes.node,
  relay: PropTypes.shape({
    route: PropTypes.shape({
      params: PropTypes.shape({
        to: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
          address: PropTypes.string.isRequired,
        }).isRequired,
        from: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
          address: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Relay.createContainer(ItinerarySummaryListContainer, {
  fragments: {
    itineraries: () => Relay.QL`
      fragment on Itinerary @relay(plural:true){
        walkDistance
        startTime
        endTime
        legs {
          realTime
          transitLeg
          startTime
          endTime
          mode
          distance
          duration
          rentedBike
          intermediatePlace
          route {
            mode
            shortName
            color
            agency {
              name
            }
          }
          trip {
            stoptimes {
              stop {
                gtfsId
              }
              pickupType
            }
          }
          from {
            name
            lat
            lon
            stop {
              gtfsId
            }
          }
          to {
            stop {
              gtfsId
            }
          }
        }
      }
    `,
  },
});
