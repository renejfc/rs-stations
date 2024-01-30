<script setup lang="ts">
import { Input, Label } from '@/components/ui'
import { ref } from 'vue'

const input = ref('')
</script>

<template>
  <div class="container pt-10">
    <Label for="gen">Gen</Label>
    <Input id="gen" v-model="input" />
  </div>
</template>
