<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/utils'
import { Button } from '@/components/ui'
import { getYear, setMonth, setYear, format } from 'date-fns'

const date = defineModel<Date>({ required: true })

const selectingMonth = ref(false)
const selectingYear = ref(false)

const monthsList = Array.from({ length: 12 }, (_, i) => i)
const yearsList = Array.from({ length: 12 }, (_, i) => getYear(date.value) - 5 + i)

function toggleMonthPicker() {
  selectingMonth.value = !selectingMonth.value
}

function toggleYearPicker() {
  selectingYear.value = !selectingYear.value
}

function changeMonth(month: number) {
  date.value = setMonth(date.value, month)
}

function changeYear(year: number) {
  date.value = setYear(date.value, year)
}

const isSelectedMonth = (month: number) => date.value.getMonth() === month
const isSelectedYear = (year: number) => getYear(date.value) === year
</script>
<template>
  <div class="flex">
    <div class="relative">
      <Button
        variant="outline"
        size="lg"
        class="rounded-r-none text-xl uppercase tracking-tighter"
        @click="toggleMonthPicker"
      >
        <span class="text-2xl uppercase">{{ format(date, 'MMM') }}</span>
      </Button>
      <ul
        v-if="selectingMonth"
        class="absolute z-50 mt-1 w-full cursor-pointer overflow-hidden rounded-md rounded-t-none border border-border bg-background shadow-md"
        role="listbox"
        aria-label="Select Month"
      >
        <li
          v-for="month in monthsList"
          :key="month"
          :class="cn('px-4 py-2 hover:bg-primary hover:text-background', { 'bg-accent': isSelectedMonth(month) })"
          @click="
            () => {
              changeMonth(month)
              toggleMonthPicker()
            }
          "
          role="option"
        >
          {{ format(new Date(0, month), 'MMMM') }}
        </li>
      </ul>
    </div>
    <div class="relative">
      <Button
        variant="outline"
        size="lg"
        class="rounded-l-none text-xl uppercase tracking-tighter"
        @click="toggleYearPicker"
      >
        <span class="text-2xl uppercase">{{ getYear(date) }}</span>
      </Button>
      <ul
        v-if="selectingYear"
        class="absolute z-50 mt-1 w-full cursor-pointer overflow-hidden rounded-md rounded-t-none border border-border bg-background shadow-md"
        aria-label="Select Year"
      >
        <li
          v-for="year in yearsList"
          :key="year"
          :class="cn('px-4 py-2 hover:bg-primary hover:text-background', { 'bg-accent': isSelectedYear(year) })"
          @click="
            () => {
              changeYear(year)
              toggleYearPicker()
            }
          "
          role="option"
        >
          {{ year }}
        </li>
      </ul>
    </div>
  </div>
</template>
