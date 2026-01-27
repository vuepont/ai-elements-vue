<script setup lang="ts">
import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from '@repo/elements/artifact'
import { CodeBlock } from '@repo/elements/code-block'
import { Copy, Download, Play, RefreshCw, Share } from 'lucide-vue-next'

const code = `# Dijkstra's Algorithm implementation
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    heap = [(0, start)]
    visited = set()
    
    while heap:
        current_distance, current_node = heapq.heappop(heap)
        if current_node in visited:
            continue
        visited.add(current_node)
        
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(heap, (distance, neighbor))
    
    return distances

# Example graph
 graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}

print(dijkstra(graph, 'A'))`

function handleRun() {
  console.log('Run')
}

function handleCopy() {
  console.log('Copy')
}

function handleRegenerate() {
  console.log('Regenerate')
}

function handleDownload() {
  console.log('Download')
}

function handleShare() {
  console.log('Share')
}
</script>

<template>
  <Artifact>
    <ArtifactHeader>
      <div>
        <ArtifactTitle>Dijkstra's Algorithm Implementation</ArtifactTitle>
        <ArtifactDescription>Updated 1 minute ago</ArtifactDescription>
      </div>
      <div class="flex items-center gap-2">
        <ArtifactActions>
          <ArtifactAction
            :icon="Play"
            label="Run"
            tooltip="Run code"
            @click="handleRun"
          />
          <ArtifactAction
            :icon="Copy"
            label="Copy"
            tooltip="Copy to clipboard"
            @click="handleCopy"
          />
          <ArtifactAction
            :icon="RefreshCw"
            label="Regenerate"
            tooltip="Regenerate content"
            @click="handleRegenerate"
          />
          <ArtifactAction
            :icon="Download"
            label="Download"
            tooltip="Download file"
            @click="handleDownload"
          />
          <ArtifactAction
            :icon="Share"
            label="Share"
            tooltip="Share artifact"
            @click="handleShare"
          />
        </ArtifactActions>
      </div>
    </ArtifactHeader>
    <ArtifactContent class="p-0">
      <CodeBlock
        class="border-none"
        :code="code"
        language="python"
        show-line-numbers
      />
    </ArtifactContent>
  </Artifact>
</template>
