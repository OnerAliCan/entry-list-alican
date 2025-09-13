// Component to render a single table row for an entry

export default function EntryRow({ rowData }) {
  return (
    <tr className="entry-row">
      {rowData.map((item, index) => (
        <td key={index}>{item}</td>
      ))}
    </tr>
  )
}
