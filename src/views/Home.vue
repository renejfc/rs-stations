<script setup lang="ts">
import { Button } from '@/components/ui'
</script>
<template>
  <main>
    <div class="mx-auto flex max-w-screen-xl flex-col gap-10 px-4 py-8 text-center lg:py-16">
      <header class="flex flex-col gap-4">
        <h1 class="text-4xl font-extrabold leading-none tracking-tighter md:text-5xl lg:text-6xl">
          Welcome to the calendar of bookings
        </h1>
        <h2 class="text-xl font-extrabold leading-none tracking-tighter text-muted-foreground md:text-2xl lg:text-3xl">
          Let's see them all!
        </h2>
      </header>
      <p class="text-lg text-muted-foreground sm:px-16 lg:px-48 lg:text-xl">
        You can search for stations, and see the bookings for each day (if any). You can also see the details of each
        booking by clicking on the items in the table.
      </p>
      <p
        class="inline-flex flex-col items-center gap-5 text-lg font-normal text-muted-foreground sm:px-16 lg:px-48 lg:text-xl"
      >
        Don't be shy, give it a try!
        <span class="mt-16 motion-safe:animate-bounce">
          <RouterLink to="/calendar">
            <Button size="lg">Go to Calendar</Button>
          </RouterLink>
        </span>
      </p>
    </div>
  </main>
</template>
