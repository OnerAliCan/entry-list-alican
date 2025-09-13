// Main component that imports and manages all sub-components
import { useState, useEffect } from 'react'
import EntryRow from './EntryRow'
import SortingTableHeaders from './SortingTableHeaders'
import EntrySearch from './EntrySearch'
import EntryNumber from './EntryNumber'
import EntriesDropdown from './EntriesDropdown'
import Pagination from './Pagination'
import dropdownOptions from './data/dropdownOptions'
import sortArrowBlank from './assets/sort-arrow-blank.svg'
import sortArrowUp from './assets/sort-arrow-up.svg'
import sortArrowDown from './assets/sort-arrow-down.svg'

export default function List({ entries, tableHeaders }) {
  // STATES INIT
  // User search input, starts empty
  const [searchQuery, setSearchQuery] = useState('')

  // Number of entries displayed per page, default 10
  const [dropdownSelectedOption, setDropdownSelectedOption] = useState(10)

  // Current page, default 1
  const [page, setPage] = useState(1)

  // Sorting configuration, default sort by firstName ascending
  const [sortConfig, setSortConfig] = useState({
    key: 'firstName',
    direction: 'asc',
  })

  // Make a copy of entries for sorting/filtering
  let sortedEntries = [...entries]

  // SORT ENTRIES
  if (sortConfig.key) {
    sortedEntries.sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      // Compare strings
      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      // Compare numbers
      if (typeof aValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue
      }

      // Compare dates
      if (aValue instanceof Date || !isNaN(Date.parse(aValue))) {
        return sortConfig.direction === 'asc'
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue)
      }

      return 0
    })
  }

  // FILTER ENTRIES BASED ON SEARCH INPUT
  // convert filteredEntries object in an array with stringified values
  let filteredEntries = sortedEntries.filter((entry) => {
    return Object.values(entry).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase()),
    )
  })

  // SORT HANDLER
  const handleSort = (columnKey) => {
    if (sortConfig.key === columnKey) {
      setSortConfig({
        key: columnKey,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      })
    } else {
      setSortConfig({ key: columnKey, direction: 'asc' })
    }
  }

  // Map headers to include sort icons and click handlers
  const headers = tableHeaders.map((tableHeader) => {
    let icon = sortArrowBlank
    if (sortConfig.key === tableHeader.key) {
      icon = sortConfig.direction === 'asc' ? sortArrowDown : sortArrowUp
    }

    return {
      label: tableHeader.label,
      key: tableHeader.key,
      onClick: () => handleSort(tableHeader.key),
      icon,
    }
  })

  // LENGTHS FOR DISPLAY
  const filteredEntriesLength = filteredEntries.length
  const totalNumberLength = sortedEntries.length

  //SECTION ENTRYNUMBER DROPDOWN

  // first displayed entry index ("x" in "Showing x")
  const displayedNumber = dropdownSelectedOption * (page - 1) + 1

  // last displayed entry index (after "to")
  let lastDisplayedEntryIndex = Math.min(
    dropdownSelectedOption * page,
    totalNumberLength,
  )
  const lastDisplayedNumber = Math.min(
    dropdownSelectedOption * page,
    filteredEntriesLength,
  )

  // HANDLER FOR DROPDOWN CHANGE
  const handleDropdownChange = (value) => {
    setDropdownSelectedOption(value)
    setPage(1)
  }

  // HANDLER FOR SEARCH INPUT CHANGE
  const handleChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setPage(1)
  }

  // PAGINATION SECTION

  // ADJUST PAGE IF OUT OF BOUNDS
  const maxPage = Math.ceil(filteredEntriesLength / dropdownSelectedOption)

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (page < maxPage) {
      setPage(page + 1)
    }
  }

  // ADJUST PAGE IF OUT OF BOUNDS
  useEffect(() => {
    if (page > maxPage) {
      setPage(maxPage || 1)
    }
    if (page < 1) {
      setPage(1)
    }
  }, [maxPage, page, setPage])

  // FORMAT EACH ENTRY AS ARRAY OF VALUES
  const formatEntry = (entry) => [
    entry.firstName,
    entry.lastName,
    new Date(entry.dateOfBirth).toLocaleDateString(),
    new Date(entry.startDate).toLocaleDateString(),
    entry.department,
    entry.street,
    entry.city,
    entry.state,
    entry.zipCode,
  ]

  // GET ONLY ENTRIES FOR CURRENT PAGE
  const getDisplayedEntries = () =>
    filteredEntries
      .slice((page - 1) * dropdownSelectedOption, page * dropdownSelectedOption)
      .map(formatEntry)

  // SELECT PAGE BUTTONS SECTION

  let pagesToShow = []

  // Displays all page buttons if maxPage less or equal 7
  if (maxPage <= 7) {
    pagesToShow = Array.from({ length: maxPage }, (_, i) => i + 1)
  } else {
    // If more than 7 pages, show either the first ones, or the current page with previous/next, or the last ones
    const first = 1
    const last = maxPage

    // First pages
    if (page <= 4) {
      pagesToShow = [1, 2, 3, 4, 5, '...', last]
    }
    // Last pages
    else if (page >= maxPage - 3) {
      pagesToShow = [
        first,
        '...',
        maxPage - 4,
        maxPage - 3,
        maxPage - 2,
        maxPage - 1,
        last,
      ]
    }
    // Middle pages
    else {
      pagesToShow = [first, '...', page - 1, page, page + 1, '...', last]
    }
  }

  return (
    <>
      <div className="entry-list">
        <div className="entry-list-top">
          <EntriesDropdown
            dropdownOptions={dropdownOptions}
            dropdownSelectedOption={dropdownSelectedOption}
            onChange={handleDropdownChange}
          />
          <EntrySearch searchQuery={searchQuery} handleChange={handleChange} />
        </div>
        <div className="entry-list-middle">
          <table>
            <thead>
              <tr>
                <SortingTableHeaders headers={headers} />
              </tr>
            </thead>
            <tbody>
              {getDisplayedEntries().map((rowData, index) => (
                <EntryRow key={index} rowData={rowData} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="entry-list-bottom">
          <EntryNumber
            filteredEntriesLength={filteredEntriesLength}
            totalNumberLength={totalNumberLength}
            displayedNumber={displayedNumber}
            lastDisplayedEntryIndex={lastDisplayedEntryIndex}
            lastDisplayedNumber={lastDisplayedNumber}
          />
          <Pagination
            page={page}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            maxPage={maxPage}
            setPage={setPage}
            pagesToShow={pagesToShow}
          />
        </div>
      </div>
    </>
  )
}
