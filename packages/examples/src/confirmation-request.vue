<script setup lang="ts">
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

function handleReject() {
  // In production, call respondToConfirmationRequest with approved: false
}

function handleApprove() {
  // In production, call respondToConfirmationRequest with approved: true
}
</script>

<template>
  <div class="w-full max-w-2xl">
    <Confirmation :approval="{ id: nanoid() }" state="approval-requested">
      <ConfirmationTitle>
        <ConfirmationRequest>
          This tool wants to execute a query on the production database:
          <code class="mt-2 block rounded bg-muted p-2 text-sm">
            SELECT * FROM users WHERE role = 'admin'
          </code>
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
