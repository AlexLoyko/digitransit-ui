import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import { FormattedMessage, intlShape } from 'react-intl';
import cx from 'classnames';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Icon from './Icon';
import CallAgencyWarning from './CallAgencyWarning';
import FavouriteRouteContainer from './FavouriteRouteContainer';
import RoutePatternSelect from './RoutePatternSelect';
import RouteAgencyInfo from './RouteAgencyInfo';
import RouteNumber from './RouteNumber';
import { startRealTimeClient, stopRealTimeClient } from '../action/realTimeClientAction';
import { deleteSelectedItem } from '../action/StopVsPatternSearchAction';
import config from '../configurations/config.default';


function findItemElement(startNode) {
  let node = startNode;

  do {
    if (node.getAttribute('data-name') !== null) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);

  console.error('Clicked item:', startNode); // eslint-disable-line no-console
  throw new Error('Couldn\'t find the clicked item element');
}

class RoutePage extends React.Component {

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired,
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
    breakpoint: PropTypes.string,
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      patternId: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = { filterClicked: false };
  }

  componentDidMount() {
    if (this.props.route == null) { return; }
    const route = this.props.route.gtfsId.split(':');


    let shouldStartRealtimeClient = false;

    if (config.feed_id) {
      for (let i = 0; i < config.feed_id.length; i++) {
        if (route[0].toLowerCase() === config.feed_id[i].toLowerCase()) {
          shouldStartRealtimeClient = true;
          break;
        }
      }
    }
    console.log(shouldStartRealtimeClient);
    if (route[0].toLowerCase() === 'hsl' || shouldStartRealtimeClient) {
      this.context.executeAction(startRealTimeClient, {
        route: route.join(':'),
      });
    }
  }

  componentWillUnmount() {
    const { client } = this.context.getStore('RealTimeInformationStore');

    if (client) {
      this.context.executeAction(stopRealTimeClient, client);
    }
  }

  onPatternChange = (e) => {
    this.context.router.replace(
      decodeURIComponent(this.props.location.pathname)
        .replace(new RegExp(`${this.props.params.patternId}(.*)`), e.target.value),
    );
  }

  changeTab = (path) => {
    this.context.router.replace(path);
    if (path.indexOf('/pysakit/') < 0) {
      this.setState({ filterClicked: false });
    }
  }

  deleteSelectedStop(event) {
    let clickedItem = findItemElement(event.target);
    let stopToRemove = clickedItem.getAttribute('data-name');
    this.context.executeAction(deleteSelectedItem, { stopToRemove });
  }

  togglePatternFilter() {
    if (!this.state.filterClicked) {
      document.getElementById('stop-search-overlay').style.display = 'block';
    } else {
      document.getElementById('stop-search-overlay').style.display = 'none';
    }

    this.setState({ filterClicked: !this.state.filterClicked });
  }

  render() {
    if (this.props.route == null) {
      /* In this case there is little we can do
       * There is no point continuing rendering as it can only
       * confuse user. Therefore redirect to Routes page */
      this.props.history.replace('/linjat');
      return null;
    }

    const selectedStops = this.props.selectedStops.map(
      value =>
        <div className="selected-stops">
          <span>
            {value}
            <a
              data-name={value}
              onClick={(event) => {
                this.deleteSelectedStop(event)
              }}
            >
              <Icon img="icon-icon_close" viewbox="0 0 40 40" />
            </a>
          </span>
        </div>);

    let activeTab;
    if (this.props.location.pathname.indexOf('/pysakit/') > -1) {
      activeTab = 'pysakit';
    } else if (this.props.location.pathname.indexOf('/aikataulu/') > -1) {
      activeTab = 'aikataulu';
    } else if (this.props.location.pathname.indexOf('/hairiot') > -1) {
      activeTab = 'hairiot';
    }

    return (

      <div>{this.props.route.type === 715 && <CallAgencyWarning route={this.props.route} />}
        <div className="route-tabs">
          <nav className={cx('tabs-navigation', { 'bp-large': this.context.breakpoint === 'large' })}>
            { this.context.breakpoint === 'large' && (
            <RouteNumber color={this.props.route.color ? `#${this.props.route.color}` : null} mode={this.props.route.mode} text={this.props.route.shortName} />
          )}
            <a
              className={cx({ 'is-active': activeTab === 'pysakit' })}
              onClick={() => { this.changeTab(`/linjat/${this.props.route.gtfsId}/pysakit/${this.props.params.patternId || ''}`); }}
            >
              <div>
                <Icon img="icon-icon_bus-stop" />
                <FormattedMessage id="stops" defaultMessage="Stops" />
              </div>
            </a>
            <a
              className={cx({ 'is-active': activeTab === 'aikataulu' })}
              onClick={() => { this.changeTab(`/linjat/${this.props.route.gtfsId}/aikataulu/${this.props.params.patternId || ''}`); }}
            >
              <div>
                <Icon img="icon-icon_schedule" />
                <FormattedMessage id="timetable" defaultMessage="Timetable" />
              </div>
            </a>
            <a
              className={cx({
                activeAlert: this.props.route.alerts && this.props.route.alerts.length > 0,
                'is-active': activeTab === 'hairiot',
              })}
              onClick={() => { this.changeTab(`/linjat/${this.props.route.gtfsId}/hairiot`); }}
            >
              <div>
                <Icon img="icon-icon_caution" />
                <FormattedMessage id="disruptions" defaultMessage="Disruptions" />
              </div>
            </a>
            <FavouriteRouteContainer
              className="route-page-header"
              gtfsId={this.props.route.gtfsId}
            />
          </nav>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '600px' }}>
              {
                this.props.params.patternId && <RoutePatternSelect
                params={this.props.params}
                route={this.props.route}
                onSelectChange={this.onPatternChange}
                className={cx({ 'bp-large': this.context.breakpoint === 'large' })}
                />
              }
            </div>
            <a style={{ display: this.props.location.pathname.indexOf('/pysakit/') > -1 ? 'block' : 'none'}} onClick={() => { this.togglePatternFilter(); console.log(this.state.filterClicked); }}>
              <Icon id="pattern-search-button" className={cx({ 'is-active': this.state.filterClicked })} img="icon-icon_search" />
            </a>
          </div>
          <div className={cx('stop-search', { 'is-active': this.state.filterClicked })}>
            <RouteAgencyInfo className={cx('stop-search')} route={this.props.route} />
            {selectedStops}
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(connectToStores(RoutePage, ['StopVsPatternSearchStore'], context => ({
  selectedStops: context.getStore('StopVsPatternSearchStore').getFilterStopList(),
})), {
  fragments: {
    route: () =>
      Relay.QL`
      fragment on Route {
        gtfsId
        color
        shortName
        longName
        mode
        type
        ${RouteAgencyInfo.getFragment('route')}
        ${RoutePatternSelect.getFragment('route')}
        alerts
        agency {
          phone
        }
      }
    `,
  },
});
