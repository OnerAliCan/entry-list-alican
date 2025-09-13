// Component to display the number of entries currently shown and total entries

/* eslint-disable indent */
export default function EntryNumber({
  filteredEntriesLength,
  totalNumberLength,
  displayedNumber,
  lastDisplayedEntryIndex,
  lastDisplayedNumber,
}) {
  switch (true) {
    case filteredEntriesLength < totalNumberLength:
      return (
        <div className="showing-container">
          Showing {displayedNumber} to {lastDisplayedNumber} of{' '}
          {filteredEntriesLength} entries (filtered from {totalNumberLength}{' '}
          total entries)
        </div>
      )
    default:
      return (
        <div className="showing-container">
          Showing {displayedNumber} to {lastDisplayedEntryIndex} of{' '}
          {totalNumberLength} entries
        </div>
      )
  }
}
