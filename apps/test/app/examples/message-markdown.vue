<script setup lang="ts">
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'
import { Response } from '@repo/elements/response'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const assistantMessageTokens = [
  'To',
  ' get',
  ' the',
  ' **',
  'weather',
  ' in',
  ' Tokyo',
  '**',
  ' using',
  ' an',
  ' API',
  ' call',
  ',',
  ' you',
  ' can',
  ' use',
  ' the',
  ' [',
  'OpenWeatherMap',
  '](',
  'https://openweathermap.org/api',
  ')',
  ' API',
  '.',
  ' After',
  ' signing',
  ' up',
  ',',
  ' you',
  ' can',
  ' make',
  ' a',
  ' request',
  ' to',
  ' their',
  ' API',
  ':',
  '\n\n',
  '```',
  'bash',
  '\n',
  'curl',
  ' -X',
  ' GET',
  ' "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=YOUR_API_KEY"',
  ' \\',
  '\n',
  '  --header',
  ' "Content-Type:',
  ' application/json"',
  ' \\',
  '\n',
  '  --header',
  ' "Accept:',
  ' application/json"',
  '\n',
  '```',
  '\n\n',
  'This',
  ' will',
  ' return',
  ' a',
  ' JSON',
  ' object',
  ' with',
  ' the',
  ' weather',
  ' data',
  ' for',
  ' Tokyo',
  '.',
]

const content = ref('')

let interval: number | undefined
onMounted(() => {
  let currentContent = ''
  let index = 0
  interval = window.setInterval(() => {
    if (index < assistantMessageTokens.length) {
      currentContent += assistantMessageTokens[index]
      content.value = currentContent
      index++
    }
    else if (interval) {
      clearInterval(interval)
      interval = undefined
    }
  }, 100)
})

onBeforeUnmount(() => {
  if (interval)
    clearInterval(interval)
})
</script>

<template>
  <div class="space-y-2">
    <Message from="user">
      <MessageContent>
        <Response>What is the weather in Tokyo?</Response>
      </MessageContent>
      <MessageAvatar
        name="Hayden Bleasel"
        src="https://github.com/haydenbleasel.png"
      />
    </Message>

    <Message from="assistant">
      <MessageContent>
        <Response>{{ content }}</Response>
      </MessageContent>
      <MessageAvatar name="OpenAI" src="https://github.com/openai.png" />
    </Message>
  </div>
</template>
