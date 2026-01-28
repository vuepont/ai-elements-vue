<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@repo/elements/confirmation'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'

import { ref } from 'vue'

const approval = ref({ id: nanoid() })
const state = ref<ToolUIPart['state']>('approval-requested')

function handleReject() {
  // In production, call respondToConfirmationRequest with approved: false
}

function handleApprove() {
  // In production, call respondToConfirmationRequest with approved: true
}
</script>

<template>
  <div class="w-full max-w-2xl">
    <Confirmation :approval="approval" :state="state">
      <ConfirmationTitle>
        <ConfirmationRequest>
          This tool wants to delete the file
          <code class="inline rounded bg-muted px-1.5 py-0.5 text-sm">
            /tmp/example.txt
          </code>.
          Do you approve this action?
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

      <ConfirmationActions>
        <ConfirmationAction variant="outline" @click="handleReject">
          Reject
        </ConfirmationAction>
        <ConfirmationAction variant="default" @click="handleApprove">
          Approve
        </ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  </div>
</template>
