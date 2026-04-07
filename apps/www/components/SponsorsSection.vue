<script setup lang="ts">
const appConfig = useAppConfig()
const sponsors = computed(() => appConfig.shadcnDocs.sponsors)
</script>

<template>
  <section
    v-if="sponsors.items.length"
    class="mt-12"
    aria-labelledby="sponsors"
  >
    <div class="mb-4 flex items-center justify-between gap-4">
      <h2 id="sponsors" class="text-3xl font-semibold tracking-tight">
        {{ sponsors.title }}
      </h2>
    </div>

    <div class="grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2">
      <SponsorTile
        v-for="item in sponsors.items"
        :key="item.name"
        :alt="item.alt"
        :href="item.href"
        :logo="item.logo"
        :name="item.name"
      />
      <SponsorTile
        :href="sponsors.cta.href"
        :name="sponsors.cta.name"
      />
    </div>
  </section>
</template>
