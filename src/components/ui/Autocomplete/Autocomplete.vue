<script setup lang="ts">
import { Input } from '@/components/ui'
import { computed, ref, withDefaults } from 'vue'
import { type Selectable, AutocompleteList, AutocompleteItem, type AutocompleteProps } from '.'

const props = withDefaults(defineProps<AutocompleteProps>(), {
  data: () => []
})

const emit = defineEmits<{
  select: [name: string, id: string]
}>()

const searchValue = ref('')
const selecting = ref(false)
const selection = ref<Selectable | null>(null)

const searchResults = computed(() => {
  if (!searchValue.value) return []

  return props.data.filter((item) => {
    return item.label.toLowerCase().includes(searchValue.value?.toLowerCase())
  })
})

function setSelection(valueId: string) {
  selecting.value = true
  searchValue.value = props.data.find((item) => item.id === valueId)?.label || ''
  selection.value = props.data.find((item) => item.id === valueId) || null

  if (selection.value) {
    emit('select', selection.value.label, selection.value.id)
  }

  selecting.value = false
}

function resetInputText() {
  if (!selecting.value) return
  searchValue.value = selection.value?.label || ''
}
</script>
<template>
  <div>
    <Input v-model="searchValue" @blur="resetInputText" />
    <AutocompleteList>
      <AutocompleteItem
        v-for="item in searchResults"
        :key="item.id"
        :isSelected="item.label === selection?.label"
        :valueId="item.id || item.label"
        @select="setSelection"
      >
        {{ item.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </div>
</template>
