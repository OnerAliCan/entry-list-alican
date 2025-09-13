Pour ton package `EntryList`, ton `README.md` doit être **clair et explicite**, surtout si quelqu’un d’autre (ou toi plus tard) doit l’utiliser. Voici un exemple structuré que tu peux adapter :

---

````md
# EntryList

A reusable React component for displaying an employee list with search, sorting, pagination, and entries-per-page dropdown.

## Features

- Search entries by any field
- Sort columns ascending/descending
- Pagination with page buttons
- Select number of entries per page
- Fully modular components

## Installation

```bash
npm install entry-list-alican
````

## Usage

```jsx
import React from 'react'
import List from 'entry-list-alican/List'
import { useSelector } from 'react-redux'
import tableHeaders from '../data/tableHeaders'

export default function EntryList() {
  const entries = useSelector((state) => state.entries.list)

  return (
    <div>
      <h4>Employees List</h4>
      <List entries={entries} tableHeaders={tableHeaders} />
    </div>
  )
}
```

## Props

| Prop           | Type  | Description                            |
| -------------- | ----- | -------------------------------------- |
| `entries`      | array | Array of employee objects              |
| `tableHeaders` | array | Array of objects with `{ key, label }` |

## Structure

The package includes:

```
List.jsx
EntriesDropdown.jsx
EntryNumber.jsx
EntryRow.jsx
EntrySearch.jsx
Pagination.jsx
SelectPage.jsx
SortingTableHeaders.jsx
data/dropdownOptions.js
assets/*.svg
```