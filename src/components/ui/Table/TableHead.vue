<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <th
    :class="
      cn(
        'h-12 px-4 text-left align-middle text-xs font-medium uppercase tracking-tight text-muted-foreground',
        props.class
      )
    "
  >
    <slot />
  </th>
</template>
