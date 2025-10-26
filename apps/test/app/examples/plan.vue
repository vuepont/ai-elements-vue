<script setup lang="ts">
import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from '@repo/elements/plan'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Kbd, KbdGroup } from '@repo/shadcn-vue/components/ui/kbd'
import { FileText } from 'lucide-vue-next'
</script>

<template>
  <Plan :default-open="false">
    <PlanHeader>
      <div>
        <div class="mb-4 flex items-center gap-2">
          <FileText class="size-4" />
          <PlanTitle>Rewrite AI Elements to VueJS</PlanTitle>
        </div>
        <PlanDescription>
          Rewrite the AI Elements component library from React to VueJS while
          maintaining compatibility with existing React-based shadcn/ui
          components using vue-js/compat, updating all 29 components and their
          test suite.
        </PlanDescription>
      </div>
      <PlanTrigger />
    </PlanHeader>
    <PlanContent>
      <div class="space-y-4 text-sm">
        <div>
          <h3 class="mb-2 font-semibold">
            Overview
          </h3>
          <p>
            This plan outlines the migration strategy for converting the AI
            Elements library from React to VueJS, ensuring compatibility and
            maintaining existing functionality.
          </p>
        </div>
        <div>
          <h3 class="mb-2 font-semibold">
            Key Steps
          </h3>
          <ul class="list-inside list-disc space-y-1">
            <li>Set up VueJS project structure</li>
            <li>Install vue-js/compat for React compatibility</li>
            <li>Migrate components one by one</li>
            <li>Update test suite for each component</li>
            <li>Verify compatibility with shadcn/ui</li>
          </ul>
        </div>
      </div>
    </PlanContent>
    <PlanFooter class="justify-end">
      <PlanAction>
        <Button size="sm">
          Build
          <KbdGroup class="gap-0">
            <Kbd class="bg-transparent text-inherit">⌘</Kbd>
            <Kbd class="translate-y-px bg-transparent text-inherit">↩</Kbd>
          </KbdGroup>
        </Button>
      </PlanAction>
    </PlanFooter>
  </Plan>
</template>
