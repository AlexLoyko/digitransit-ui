import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import { FormattedMessage, intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import find from 'lodash/find';
import DisruptionRow from './DisruptionRow';
import ModeFilterContainer from './ModeFilterContainer';

function DisruptionListContainer({ root }, { intl }, props) {

  if (!root || !root.alerts || root.alerts.length === 0) {
    return (
      <FormattedMessage
        id="disruption-info-no-alerts"
        defaultMessage="No known disruptions or diversions."
      />
    );
  }

  const alertElements = root.alerts.map((alert) => {
    const { id } = alert;
    const startTime = moment(alert.effectiveStartDate * 1000);
    const endTime = moment(alert.effectiveEndDate * 1000);
    const cause = 'because';
    const routes = alert.route;
    const translation = find(alert.alertDescriptionTextTranslations, ['language', intl.locale]);

    const description = translation ? translation.text : alert.alertDescriptionText;


    return (
      <DisruptionRow
        key={id}
        description={description}
        startTime={startTime}
        endTime={endTime}
        cause={cause}
        routes={routes}
      />
    );
  });

  return (
    <div >
      {alertElements}
    </div>
  );
}
DisruptionListContainer.contextTypes = {
  intl: intlShape,
};

DisruptionListContainer.propTypes = {
  root: PropTypes.shape({
    alerts: PropTypes.array,
  }).isRequired,
  selectedModes: PropTypes.array.isRequired,
};

const relayFragment = {
  root: () => Relay.QL`
    fragment on QueryType {
      alerts(modes: $modes) {
        id
        feed
        alertHeaderText
        alertHeaderTextTranslations {
          text
          language
        }
        alertDescriptionText
        alertDescriptionTextTranslations {
          text
          language
        }
        effectiveStartDate
        effectiveEndDate
        route {
          shortName
          mode
        }
      }
    }
  `,
};

export default Relay.createContainer(DisruptionListContainer, {
  fragments: relayFragment,
  initialVariables: { modes: null },
});
