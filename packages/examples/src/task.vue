<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from '@repo/elements/task'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

interface TaskEntry {
  key: string
  type?: 'text' | 'file'
  text?: string
  filename?: string
}

const tasks = ref<TaskEntry[]>([
  { key: nanoid(), text: 'Searching "app/page.tsx, components structure"' },
  { key: nanoid(), type: 'file', text: 'Read', filename: 'index.vue' },
  { key: nanoid(), text: 'Scanning 52 files' },
  { key: nanoid(), text: 'Scanning 2 files' },
  { key: nanoid(), type: 'file', text: 'Reading files', filename: 'layout.vue' },
])
</script>

<template>
  <div style="height: 200px">
    <Task class="w-full">
      <TaskTrigger title="Found project files" />
      <TaskContent>
        <TaskItem
          v-for="task in tasks"
          :key="task.key"
        >
          <!-- If task is text -->
          <template v-if="!task.type">
            {{ task.text }}
          </template>

          <!-- If task includes a file -->
          <template v-else>
            <span class="inline-flex items-center gap-1">
              {{ task.text }}
              <TaskItemFile>
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                >
                  <path d="M2 4L16 28L30 4H24.5L16 18.5L7.5 4H2Z" fill="#41B883" />
                  <path
                    d="M7.5 4L16 18.5L24.5 4H19.5L16.0653 10.0126L12.5 4H7.5Z"
                    fill="#35495E"
                  />
                </svg>
                <span>{{ task.filename }}</span>
              </TaskItemFile>
            </span>
          </template>
        </TaskItem>
      </TaskContent>
    </Task>
  </div>
</template>
