<script setup lang="ts">
import { Source, Sources, SourcesContent, SourcesTrigger } from '@repo/elements/sources'
import { ChevronDownIcon, ExternalLinkIcon } from 'lucide-vue-next'

const sources = [
  { href: 'https://stripe.com/docs/api', title: 'Stripe API Documentation' },
  { href: 'https://docs.github.com/en/rest', title: 'GitHub REST API' },
  {
    href: 'https://docs.aws.amazon.com/sdk-for-javascript/',
    title: 'AWS SDK for JavaScript',
  },
]
</script>

<template>
  <div style="height: 110px">
    <Sources>
      <SourcesTrigger :count="sources.length">
        <p class="font-medium">
          Using {{ sources.length }} citations
        </p>
        <ChevronDownIcon class="size-4" />
      </SourcesTrigger>

      <SourcesContent>
        <Source
          v-for="source in sources"
          :key="source.href"
          :href="source.href"
          :title="source.title"
        >
          {{ source.title }}
          <ExternalLinkIcon class="size-4" />
        </Source>
      </SourcesContent>
    </Sources>
  </div>
</template>
