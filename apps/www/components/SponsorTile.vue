<script setup lang="ts">
const props = withDefaults(defineProps<{
  alt?: string
  compact?: boolean
  href: string
  logo?: string
  name: string
}>(), {
  alt: undefined,
  compact: false,
  logo: undefined,
})

const isLogoTile = computed(() => Boolean(props.logo))
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex h-full w-full items-center justify-center bg-card px-6 py-6 transition-colors hover:bg-muted/60"
    :class="compact ? 'min-h-[88px]' : 'min-h-[140px]'"
  >
    <img
      v-if="isLogoTile"
      :src="logo"
      :alt="alt ?? name"
      class="h-auto w-full transition-transform group-hover:scale-[1.02]"
      :class="compact ? 'max-w-[132px]' : 'max-w-[220px]'"
    >
    <div
      v-else
      class="flex items-center gap-2 text-center font-medium text-muted-foreground transition-colors group-hover:text-foreground"
      :class="compact ? 'text-xs' : 'text-sm'"
    >
      <span>{{ name }}</span>
      <Icon name="lucide:arrow-up-right" :size="compact ? 14 : 16" />
    </div>
  </a>
</template>
