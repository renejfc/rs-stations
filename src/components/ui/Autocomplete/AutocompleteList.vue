<script setup lang="ts">
import type { AutocompleteListProps } from '.'

defineProps<AutocompleteListProps>()
</script>
<template>
  <ul v-show="isOpen" class="bg-slate-500">
    <slot />
  </ul>
</template>
