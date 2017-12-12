import _ from 'lodash';
import Store from 'fluxible/addons/BaseStore';

class StopVsPatternSearchStore extends Store {
  static storeName = 'StopVsPatternSearchStore';

  constructor(dispatcher) {
    super(dispatcher);
    this.value = '';
    this.className = 'stop-search-bar';
    this.items = [];
    this.highlightedSectionIndex = null;
    this.highlightedItemIndex = null;
    this.selectedItem = null;
    this.filterStopList = [];
  }

  getClassName() {
    return this.className;
  }

  getValue() {
    return this.value;
  }

  getItems() {
    return this.items;
  }

  getSelectedItem() {
    return this.selectedItem;
  }

  getFilterStopList() {
    return this.filterStopList;
  }

  getHighlightedSectionIndex() {
    return this.highlightedSectionIndex;
  }

  getHighlightedItemIndex() {
    return this.highlightedItemIndex;
  }

  deleteSelected(data) {
    _.pull(this.filterStopList, data.stopToRemove);
    this.resetSelectedItem();
    this.emitChange();
  }


  updateInputValue(data) {
    const { value, items } = data;
    this.value = value;
    this.items = items;

    if (this.items && this.items.length > 0) {
      this.className = 'stop-search-bar open';
    } else {
      this.className = 'stop-search-bar';
    }
    this.emitChange();
  }

  hideItems() {
    this.items = [];
    this.className = 'stop-search-bar';
    this.highlightedItemIndex = null;
    this.highlightedSectionIndex = null;
    this.emitChange();
  }

  selectItem(clickedData) {
    this.selectedItem = clickedData.item;

    if (!_.includes(this.filterStopList, this.selectedItem.name)) {
      this.filterStopList.push(this.selectedItem.name);
    }
    this.emitChange();
  }

  resetSelectedItem() {
    this.selectedItem = null;
    this.emitChange();
  }

  updateHighlightedItem(highlightingData) {
    const { highlightedSectionIndex, highlightedItemIndex } = highlightingData;
    this.highlightedSectionIndex = highlightedSectionIndex;
    this.highlightedItemIndex = highlightedItemIndex;
    this.emitChange();
  }


  static handlers = {
    StopSearchResetSelected: 'resetSelectedItem',
    StopSearchUpdateInputValue: 'updateInputValue',
    StopSearchHideItems: 'hideItems',
    StopSearchUpdateHighlightedItem: 'updateHighlightedItem',
    StopSearchSelectedItem: 'selectItem',
    StopSearchDeleteSelected: 'deleteSelected',
  };
}

export default StopVsPatternSearchStore;
