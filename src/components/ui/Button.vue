<script setup lang="ts">
import { cn } from '@/utils'

withDefaults(
  defineProps<{
    variant?: 'default' | 'outline' | 'secondary'
    size?: 'default' | 'sm' | 'lg' | 'icon'
  }>(),
  {
    variant: 'default',
    size: 'default'
  }
)

const variants = {
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  }
}
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants.variant[variant],
        variants.size[size]
      )
    "
  >
    <slot />
  </button>
</template>
