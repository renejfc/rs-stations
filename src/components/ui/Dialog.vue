<script setup lang="ts">
import { Close } from '@/components/ui/Icons'
import { Button } from '@/components/ui'

const open = defineModel<boolean>({ default: false })
const props = defineProps<{
  title: string
}>()

function close() {
  open.value = false
}
</script>

<template>
  <div
    :id="`modal-${props.title}`"
    tabindex="-1"
    class="fixed inset-x-0 top-0 z-50 size-full max-h-full overflow-hidden backdrop-blur-md"
    v-show="open"
  >
    <div class="relative max-h-full w-full max-w-7xl overflow-y-auto">
      <section
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded border bg-background p-6 shadow-lg"
      >
        <slot></slot>
        <Button @click="close" variant="outline" size="icon" class="absolute right-4 top-4 rounded-xl">
          <Close />
          <span class="sr-only">close modal</span>
        </Button>
      </section>
    </div>
  </div>
</template>
