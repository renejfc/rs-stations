<script setup lang="ts">
import { Input } from '@/components/ui'
import { computed, nextTick, ref, watch, withDefaults } from 'vue'
import { type Selectable, AutocompleteList, AutocompleteItem, type AutocompleteProps } from '.'

const props = withDefaults(defineProps<AutocompleteProps>(), {
  suggestions: () => []
})

const emit = defineEmits<{
  selection: [obj: Selectable]
}>()

const searchValue = ref('')
const selecting = ref(false)
const selection = ref<Selectable | null>(null)
const listOpen = ref(false)

const searchResults = computed(() => {
  if (!searchValue.value) return []

  return props.suggestions.filter((item) => {
    return item.label.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})

function setSelection(valueId: string) {
  selecting.value = true
  searchValue.value = props.suggestions.find((item) => item.id === valueId)?.label || ''
  selection.value = props.suggestions.find((item) => item.id === valueId) || null

  if (selection.value) {
    emit('selection', selection.value)
  }

  nextTick(() => {
    selecting.value = false
    listOpen.value = false
  })
}

function resetInputText() {
  if (!selecting.value) return
  searchValue.value = selection.value?.label || ''
}

watch(searchResults, (newResults) => {
  listOpen.value = newResults.length > 0
})
</script>
<template>
  <div>
    <Input v-model="searchValue" @blur="resetInputText" />
    <AutocompleteList :isOpen="listOpen">
      <AutocompleteItem
        v-for="item in searchResults"
        :key="item.id"
        :isSelected="item.id === selection?.id"
        :valueId="item.id"
        @select="setSelection"
      >
        {{ item.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </div>
</template>
