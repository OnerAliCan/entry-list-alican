// Component for the search input in the EntryList

export default function EntrySearch({ searchQuery, handleChange }) {
  return (
    <input
      type="text"
      placeholder="Search entries..."
      value={searchQuery}
      onChange={handleChange}
    />
  )
}
