// Common
export type Selectable = {
  id: string
  label: string
}

// Autocomplete
export type AutocompleteProps = {
  suggestions: Selectable[]
  placeholder?: string
  label?: string
}

// AutocompleteList
export type AutocompleteListProps = {
  isOpen: boolean
}

// AutocompleteItem
export type AutocompleteItemProps = {
  isSelected: boolean
  valueId: string
}
