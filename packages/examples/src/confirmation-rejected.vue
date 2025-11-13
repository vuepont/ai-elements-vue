<script setup lang="ts">
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@repo/elements/confirmation'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'

import { ref } from 'vue'

const approval = ref({
  id: nanoid(),
  approved: false,
})

const state = ref('output-denied')
</script>

<template>
  <div class="w-full max-w-2xl">
    <Confirmation :approval="approval" :state="state">
      <ConfirmationTitle>
        <ConfirmationRequest>
          This tool wants to delete the file
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
            /tmp/example.txt
          </code>
          . Do you approve this action?
        </ConfirmationRequest>

        <ConfirmationAccepted>
          <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
          <span>You approved this tool execution</span>
        </ConfirmationAccepted>

        <ConfirmationRejected>
          <XIcon class="size-4 text-destructive" />
          <span>You rejected this tool execution</span>
        </ConfirmationRejected>
      </ConfirmationTitle>
    </Confirmation>
  </div>
</template>
