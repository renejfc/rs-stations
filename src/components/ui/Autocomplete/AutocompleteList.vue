<script setup lang="ts">
import type { AutocompleteListProps } from '.'

defineProps<AutocompleteListProps>()
</script>
<template>
  <div class="relative">
    <ul
      v-show="isOpen"
      class="absolute z-50 mt-1 w-full cursor-pointer overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md"
    >
      <slot />
    </ul>
  </div>
</template>
