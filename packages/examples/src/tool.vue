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
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@repo/elements/tool'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const toolCall = ref<ToolUIPart>({
  type: 'tool-database_query',
  toolCallId: nanoid(),
  state: 'output-available',
  input: {
    query: 'SELECT COUNT(*) FROM users WHERE created_at >= ?',
    params: ['2024-01-01'],
    database: 'analytics',
  },
  output: `| User ID | Name | Email | Created At |
|---------|------|-------|------------|
| 1 | John Doe | john@example.com | 2024-01-15 |
| 2 | Jane Smith | jane@example.com | 2024-01-20 |
| 3 | Bob Wilson | bob@example.com | 2024-02-01 |
| 4 | Alice Brown | alice@example.com | 2024-02-10 |
| 5 | Charlie Davis | charlie@example.com | 2024-02-15 |`,
  errorText: undefined,
})
</script>

<template>
  <div class="space-y-4 min-h-[1400px]">
    <Tool default-open>
      <ToolHeader
        state="input-streaming"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput :input="{}" />
      </ToolContent>
    </Tool>

    <Tool>
      <ToolHeader
        state="approval-requested"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
        <Confirmation :approval="{ id: nanoid() }" state="approval-requested">
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
            <ConfirmationAccepted>
              <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
              <span>Accepted</span>
            </ConfirmationAccepted>
            <ConfirmationRejected>
              <XIcon class="size-4 text-destructive" />
              <span>Rejected</span>
            </ConfirmationRejected>
          </ConfirmationTitle>

          <ConfirmationActions>
            <ConfirmationAction variant="outline" @click="() => {}">
              Reject
            </ConfirmationAction>
            <ConfirmationAction variant="default" @click="() => {}">
              Accept
            </ConfirmationAction>
          </ConfirmationActions>
        </Confirmation>
      </ToolContent>
    </Tool>

    <Tool>
      <ToolHeader
        state="approval-responded"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
        <Confirmation
          :approval="{ id: nanoid(), approved: true }"
          state="approval-responded"
        >
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
            <ConfirmationAccepted>
              <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
              <span>Accepted</span>
            </ConfirmationAccepted>
            <ConfirmationRejected>
              <XIcon class="size-4 text-destructive" />
              <span>Rejected</span>
            </ConfirmationRejected>
          </ConfirmationTitle>
        </Confirmation>
      </ToolContent>
    </Tool>

    <Tool>
      <ToolHeader
        state="input-available"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
      </ToolContent>
    </Tool>

    <Tool>
      <ToolHeader :state="toolCall.state" :type="toolCall.type" />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
        <Confirmation
          :approval="{ id: nanoid(), approved: true }"
          state="output-available"
        >
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
            <ConfirmationAccepted>
              <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
              <span>Accepted</span>
            </ConfirmationAccepted>
            <ConfirmationRejected>
              <XIcon class="size-4 text-destructive" />
              <span>Rejected</span>
            </ConfirmationRejected>
          </ConfirmationTitle>
        </Confirmation>

        <ToolOutput
          v-if="toolCall.state === 'output-available'"
          :error-text="toolCall.errorText"
          :output="toolCall.output"
        />
      </ToolContent>
    </Tool>

    <Tool>
      <ToolHeader
        state="output-error"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
        <ToolOutput
          error-text="Connection timeout: Unable to reach database server"
        />
      </ToolContent>
    </Tool>

    <Tool>
      <ToolHeader
        state="output-denied"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput :input="toolCall.input" />
        <Confirmation
          :approval="{
            id: nanoid(),
            approved: false,
            reason: 'Query could impact production performance',
          }"
          state="output-denied"
        >
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
            <ConfirmationAccepted>
              <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
              <span>Accepted</span>
            </ConfirmationAccepted>
            <ConfirmationRejected>
              <XIcon class="size-4 text-destructive" />
              <span>
                Rejected: Query could impact production performance
              </span>
            </ConfirmationRejected>
          </ConfirmationTitle>
        </Confirmation>
      </ToolContent>
    </Tool>
  </div>
</template>
