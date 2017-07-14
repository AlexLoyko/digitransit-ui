import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';
import { routerShape, locationShape } from 'react-router';
import connectToStores from 'fluxible-addons-react/connectToStores';

import Modal from './Modal';
import Loading from './Loading';
import DisruptionListContainer from './DisruptionListContainer';
import ComponentUsageExample from './ComponentUsageExample';
import { isBrowser } from '../util/browser';


function DisruptionInfo(props, context) {
  const selectedModes = props.selectedModes.join();
  const isOpen = () => (context.location.state ? context.location.state.disruptionInfoOpen : false);

  const toggleVisibility = () => {
    if (isOpen()) {
      context.router.goBack();
    } else {
      context.router.push({
        ...location,
        state: {
          ...location.state,
          disruptionInfoOpen: true,
        },
      });
    }
  };

  if (isBrowser && isOpen()) {
    return (
      <Modal
        open
        title={
          <FormattedMessage id="disruption-info" defaultMessage="Alerts" />}
        toggleVisibility={toggleVisibility}
      >
        <Relay.RootContainer
          Component={DisruptionListContainer}
          forceFetch
          route={{
            name: 'ViewerRoute',
            queries: {
              root: (Component, { modes }) => Relay.QL`
                query {
                  viewer {
                    ${Component.getFragment('root', { modes })}
                  }
                }
             `,
            },
            params: { modes: selectedModes },
          }}
          renderLoading={() => <Loading />}
        />
      </Modal>);
  }
  return <div />;
}

DisruptionInfo.propTypes = {
  selectedModes: PropTypes.array.isRequired,
};

DisruptionInfo.contextTypes = {
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  config: PropTypes.shape({
    feedIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

DisruptionInfo.description = () =>
  <div>
    <p>
      Modal that shows all available disruption info.
      Opened by DisruptionInfoButton.
      <strong>Deprecated:</strong> Will be removed in short future in favor of announcements page.
    </p>
    <ComponentUsageExample>
      <DisruptionInfo />
    </ComponentUsageExample>
  </div>;

DisruptionInfo = connectToStores(DisruptionInfo, ['ModeStore'], (context, props) => ({
  selectedModes: context.getStore('ModeStore').getMode(),
}));

export default DisruptionInfo;
