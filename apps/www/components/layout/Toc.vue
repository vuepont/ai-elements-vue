<script setup lang="ts">
defineProps<{ isSmall: boolean }>()
const config = useConfig()

const { toc } = useContent()
const { localePath } = useI18nDocs()
const { title, links: configLinks, iconLinks, carbonAds } = useConfig().value.toc
const appConfig = useAppConfig()

const isDesktop = useMediaQuery('(min-width: 1024px)')
const carbonAdsEnabled = computed(
  () => carbonAds.enable && !(import.meta.dev && carbonAds.disableInDev),
)

const isOpen = ref(false)

const { url, enabledToc, text, icon } = useEditLink()

const hasSponsors = computed(() => appConfig.shadcnDocs.sponsors.items.length > 0)

const links = computed(
  () => {
    if (enabledToc.value) {
      return configLinks.concat([{
        title: text,
        icon,
        to: url.value,
        target: '_blank',
        showLinkIcon: true,
      }])
    }
    return configLinks
  },
)
</script>

<template>
  <UiScrollArea
    v-if="!isSmall"
    orientation="vertical"
    class="z-30 hidden overflow-y-auto md:block lg:block"
    type="hover"
  >
    <div
      class="flex flex-col gap-5"
      :class="[
        (config.aside.useLevel && config.aside.levelStyle === 'aside') ? 'h-[calc(100vh-6.5rem)]' : 'h-[calc(100vh-10rem)]',
      ]"
    >
      <div v-if="toc?.links.length">
        <p class="mb-2 text-base font-semibold">
          {{ $t(title) }}
        </p>
        <LayoutTocTree
          :links="toc.links.filter((x: any) => x.id !== 'hide-toc')"
          :level="0"
          :class="[(links.length || iconLinks?.length || hasSponsors) && 'border-b pb-5']"
        />
      </div>
      <div v-if="links.length" class="text-muted-foreground" :class="[iconLinks?.length && 'border-b pb-5']">
        <NuxtLinkLocale
          v-for="(link, i) in links"
          :key="i"
          :to="localePath(link.to)"
          :target="link.target"
          class="flex w-full gap-1 underline-offset-4 hover:underline [&:not(:first-child)]:pt-3"
        >
          <SmartIcon
            v-if="link.icon"
            :name="link.icon"
            class="mr-1 self-center"
          />
          {{ $t(link.title) }}
          <Icon v-if="link.showLinkIcon ?? (link.target === '_blank')" name="lucide:arrow-up-right" class="text-muted-foreground ml-auto self-center" size="13" />
        </NuxtLinkLocale>
      </div>
      <div v-if="iconLinks" class="text-muted-foreground">
        <NuxtLinkLocale
          v-for="(link, i) in iconLinks"
          :key="i"
          :to="localePath(link.to)"
          :target="link.target"
        >
          <UiButton size="icon" variant="ghost" class="size-7">
            <SmartIcon
              v-if="link.icon"
              :name="link.icon"
            />
          </UiButton>
        </NuxtLinkLocale>
      </div>
      <SponsorsSidebar v-if="hasSponsors" />
      <div class="flex-grow" />
      <LayoutCarbonAds v-if="isDesktop && carbonAdsEnabled" />
    </div>
  </UiScrollArea>
  <UiCollapsible
    v-else
    v-model:open="isOpen"
    class="block w-full text-sm lg:hidden"
  >
    <UiCollapsibleTrigger class="flex w-full px-4 md:px-8 py-3 text-left font-medium">
      {{ $t(title) }}
      <Icon
        name="lucide:chevron-right"
        class="ml-auto self-center transition-all"
        :class="[isOpen && 'rotate-90']"
      />
    </UiCollapsibleTrigger>
    <UiCollapsibleContent>
      <LayoutTocTree :links="toc.links" :level="0" class="mx-4 mb-3 pl-2 text-sm" />
    </UiCollapsibleContent>
  </UiCollapsible>
</template>
