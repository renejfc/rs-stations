<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <caption :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </caption>
</template>
