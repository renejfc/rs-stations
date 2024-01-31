<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps<{
  for?: string
}>()
</script>
<template>
  <label :for="props.for" :class="cn('block text-sm font-medium tracking-tight text-foreground')">
    <slot />
  </label>
</template>
