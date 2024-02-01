<script setup lang="ts">
import type { AutocompleteListProps } from '.'

defineProps<AutocompleteListProps>()
</script>
<template>
  <ul
    v-show="isOpen"
    class="relative z-50 mt-1 cursor-pointer overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md"
  >
    <slot />
  </ul>
</template>
