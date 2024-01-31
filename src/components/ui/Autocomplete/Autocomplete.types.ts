// Common
export type Selectable = {
  id: string
  label: string
}

// Autocomplete
export type AutocompleteProps = {
  data: Selectable[]
}

// AutocompleteItem
export type AutocompleteItemProps = {
  isSelected: boolean
  valueId: string
}
