<script setup lang="ts">
import { type AutocompleteItemProps, AutocompleteSeparator } from '.'
import { cn } from '@/utils'

defineProps<AutocompleteItemProps>()

const emit = defineEmits<{
  select: [valueId: string]
}>()

function select(valueId: string) {
  emit('select', valueId)
}
</script>
<template>
  <li
    @click="select(valueId)"
    :class="
      cn('relative flex w-full select-none flex-col rounded-sm text-sm hover:bg-primary', {
        'bg-muted': isSelected
      })
    "
  >
    <slot />
    <AutocompleteSeparator />
  </li>
</template>
