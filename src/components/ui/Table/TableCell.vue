<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <td :class="cn('p-4 align-middle', props.class)">
    <slot />
  </td>
</template>
