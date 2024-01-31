<script setup lang="ts">
import { Autocomplete, type Selectable } from '@/components/ui'
import data from '@/mock.json'

const normalizedData: Selectable[] = data.map((item) => ({
  label: item.name,
  id: item.id
}))
</script>

<template>
  <div class="container pt-10">
    <Autocomplete :suggestions="normalizedData" />
  </div>
</template>
