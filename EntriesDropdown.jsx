// Component for selecting the number of entries displayed per page with a dropdown

export default function EntriesDropdown({
  dropdownOptions,
  dropdownSelectedOption,
  onChange,
}) {
  return (
    <div className="entries-dropdown-container">
      <label htmlFor="entries-dropdown">Show</label>

      <select
        name="entries-dropdown"
        id="entries-dropdown"
        value={dropdownSelectedOption}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {dropdownOptions.map((dropdownOption) => (
          <option key={dropdownOption} value={dropdownOption}>
            {dropdownOption}
          </option>
        ))}
      </select>
      <span>entries</span>
    </div>
  )
}
