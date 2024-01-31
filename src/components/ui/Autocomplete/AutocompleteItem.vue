<script setup lang="ts">
import type { AutocompleteItemProps } from '.'

defineProps<AutocompleteItemProps>()

const emit = defineEmits<{
  select: [valueId: string]
}>()

function select(valueId: string) {
  emit('select', valueId)
}
</script>
<template>
  <li @click="select(valueId)">
    <slot />
  </li>
</template>
