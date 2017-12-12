import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import ReactAutowhatever from 'react-autowhatever';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import connectToStores from 'fluxible-addons-react/connectToStores';
import escapeRegexCharacters from '../util/escapeRegexChar';
import { updateInputValue, hideItems, updateHighlightedItem, selectItem, resetItem } from '../action/StopVsPatternSearchAction';

var filteredStops = [];
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

function getMatchingCountries(value, stops) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp(escapedValue, 'i');

    if (stops) {
      return stops.filter(stop => regex.test(stop.name));
    }
}

function findItemElement(startNode) {
  let node = startNode;
  do {
    if (node.getAttribute('data-item-index') !== null) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  console.error('Clicked item:', startNode); // eslint-disable-line no-console
  throw new Error('Couldn\'t find the clicked item element');
}

function renderItem(country, { value }) {
  const matches = match(country.name, value.trim());
  const parts = parse(country.name, matches);

  return (
    <span>
      {
        parts.map((part, index) => {
          const className = part.highlight ? 'stop-search-item' : null;
          return (
            <span className={className} key={index}>{part.text}</span>
          );
        })
      }
    </span>
  );
}

class RouteStopSearch extends React.Component {

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  };

  static propTypes = {
    route: PropTypes.object,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentWillMount() {
    const uniqueStops = {};
    filteredStops = [];

    for (let i = 0; i < this.props.route.stops.length; i++) {
      if (!uniqueStops.hasOwnProperty(this.props.route.stops[i].name)) {
        uniqueStops[this.props.route.stops[i].name] = 'used';
        filteredStops.push(this.props.route.stops[i]);
      }
    }
  }

  componentWillUnmount() {
    this.context.executeAction(updateInputValue, { value: '', items: [] });
    this.context.executeAction(resetItem);
  }

  onChange(event) {
    const newValue = event.target.value;
    const newItems = getMatchingCountries(newValue, filteredStops);
    this.context.executeAction(updateInputValue, { value: newValue, items: newItems });
  }

  onFocus() {
    this.context.executeAction(updateInputValue, { value: '', items: [] });
  }

  onBlur() {
    this.context.executeAction(hideItems);
    this.context.executeAction(updateInputValue, { value: '', items: [] });
  }

  onMouseEnter (event, { sectionIndex, itemIndex }) {
    this.context.executeAction(updateHighlightedItem, { sectionIndex, itemIndex });
  }

  onMouseLeave() {
    this.context.executeAction(updateHighlightedItem, { sectionIndex: null, itemIndex: null });
  }

  onMouseDown(item) {
    this.context.executeAction(selectItem, { item });
    this.context.executeAction(updateInputValue, { value: '', items: [] });
  }

  render() {
    let arr = [];
    let patterns = this.props.route.patterns;
    if (this.props.clickedItem && patterns) {
      for (let i = 0; i < patterns.length; i++) {
        if (patterns[i].tripsForDate) {
          let t = 0;
          while (!patterns[i].tripsForDate[t] && t < patterns[i].tripsForDate.length) {
            t += 1;
          }
          const trip = patterns[i].tripsForDate[t];
          if (!trip) {
            continue;
          }

          for (let j = 0; j < trip.stops.length; j++) {
            if (this.props.clickedItem.name === trip.stops[j].name) {
              arr.push({ id: patterns[i].id, name: patterns[i].name, headsign: patterns[i].headsign });
            }
          }
        }
      }
    }

        const {
            value, highlightedSectionIndex, highlightedItemIndex, items
        } = this.props;

        const onChange = this.onChange.bind(this);
        const onFocus = this.onFocus.bind(this);
        const onBlur = this.onBlur.bind(this);
        const onMouseEnter = this.onMouseEnter.bind(this);
        const onMouseLeave = this.onMouseLeave.bind(this);
        const onMouseDown = this.onMouseDown.bind(this);

        const inputProps = {
            placeholder: 'Enter the stop name on this route',
            value,
            onChange,
            onFocus,
            onBlur
        };
        const itemProps = ({ itemIndex }) => ({
            'data-item-index': itemIndex,
            onMouseEnter,
            onMouseLeave,
            onMouseDown: event => {
                const clickedItem = findItemElement(event.target);
                const clickedItemIndex = clickedItem.getAttribute('data-item-index');
                onMouseDown(items[clickedItemIndex]);
            }
        });

        //
        return (
          <div>
            <div id="stop-search-overlay" style={{ display: 'none', width: '600px', height: '100%', marginTop: '42px', backgroundColor: 'rgba(0,0,0,0.2)', zIndex: '-1', position: 'fixed' }}></div>
            <div id='stop-search-input' className={this.props.className}>
                <ReactAutowhatever
                    items={items}
                    renderItem={renderItem}
                    renderItemData={{ value }}
                    inputProps={inputProps}
                    highlightedSectionIndex={highlightedSectionIndex}
                    highlightedItemIndex={highlightedItemIndex}
                    itemProps={itemProps}
                />
            </div>
          </div>
        );
    }
}

export default Relay.createContainer(connectToStores(RouteStopSearch, ['StopVsPatternSearchStore'], context => ({
    clickedItem: context.getStore('StopVsPatternSearchStore').getSelectedItem(),
    value: context.getStore('StopVsPatternSearchStore').getValue(),
    items: context.getStore('StopVsPatternSearchStore').getItems(),
    highlightedSectionIndex: context.getStore('StopVsPatternSearchStore').getHighlightedSectionIndex(),
    highlightedItemIndex: context.getStore('StopVsPatternSearchStore').getHighlightedItemIndex(),
    className: context.getStore('StopVsPatternSearchStore').getClassName(),
    selectedStops: context.getStore('StopVsPatternSearchStore').getFilterStopList(),

})), { initialVariables: {
  date,
},
  fragments: {
    route: () =>
      Relay.QL`
      fragment on Route {
        patterns {
          id
          name
          headsign
          code
          tripsForDate(serviceDay: $date){
            tripHeadsign
            stops {
              name
            }
          }
        }
        stops {
          id
          name
        }
      }
    `,
  },
});
