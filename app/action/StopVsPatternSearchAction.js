export function updateInputValue(actionContext, { value, items }) {
  actionContext.dispatch('StopSearchUpdateInputValue', {
    value,
    items,
  });
}

export function hideItems(actionContext) {
  actionContext.dispatch('StopSearchHideItems');
}

export function updateHighlightedItem(actionContext, { highlightedSectionIndex, highlightedItemIndex }) {
  actionContext.dispatch('StopSearchUpdateHighlightedItem', {
    highlightedSectionIndex,
    highlightedItemIndex,
  });
}

export function deleteSelectedItem(actionContext, { stopToRemove }) {
  actionContext.dispatch('StopSearchDeleteSelected', {
    stopToRemove
  });
}

export function selectItem(actionContext, { item }) {
  actionContext.dispatch('StopSearchSelectedItem', {
    item
  });
}

export function resetItem(actionContext) {
  actionContext.dispatch('StopSearchResetSelected');
}
