<script setup lang="ts">
import { cn } from '@/utils'
import { Input, Label } from '@/components/ui'
import { computed, nextTick, ref, withDefaults } from 'vue'
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

function setSelection(valueId: Selectable['id']) {
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

function handleInputBlur() {
  setTimeout(() => {
    searchValue.value = selection.value?.label || ''
    listOpen.value = false
  }, 100)
}

function handleInputFocus() {
  listOpen.value = true
}
</script>
<template>
  <div>
    <Label>
      {{ label }}
      <Input v-model="searchValue" @blur="handleInputBlur" @focus="handleInputFocus" :placeholder="placeholder" />
    </Label>
    <AutocompleteList :isOpen="listOpen">
      <AutocompleteItem
        v-for="item in searchResults"
        :key="item.id"
        :isSelected="item.id === selection?.id"
        :valueId="item.id"
        @select="setSelection"
      >
        <span :class="cn('py-1.5 pl-8 pr-2 text-sm font-semibold')">{{ item.label }}</span>
      </AutocompleteItem>
    </AutocompleteList>
  </div>
</template>
