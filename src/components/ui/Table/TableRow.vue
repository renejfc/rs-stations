<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <tr :class="cn('border-b transition-colors hover:bg-muted/50', props.class)">
    <slot />
  </tr>
</template>
