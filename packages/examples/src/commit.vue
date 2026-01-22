<script setup lang="ts">
import {
  Commit,
  CommitActions,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileIcon,
  CommitFileInfo,
  CommitFilePath,
  CommitFiles,
  CommitFileStatus,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from '@repo/elements/commit'

const hash = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0'
const timestamp = new Date(Date.now() - 1000 * 60 * 60 * 2)

const files = [
  {
    path: 'src/auth/login.tsx',
    status: 'added' as const,
    additions: 150,
    deletions: 0,
  },
  {
    path: 'src/auth/logout.tsx',
    status: 'added' as const,
    additions: 45,
    deletions: 0,
  },
  {
    path: 'src/lib/session.ts',
    status: 'modified' as const,
    additions: 23,
    deletions: 8,
  },
]

function handleCopy() {
  // eslint-disable-next-line no-console
  console.log('Copied hash!')
}
</script>

<template>
  <Commit>
    <CommitHeader>
      <CommitAuthor>
        <CommitAuthorAvatar initials="HB" />
      </CommitAuthor>
      <CommitInfo>
        <CommitMessage>feat: Add user authentication flow</CommitMessage>
        <CommitMetadata>
          <CommitHash>{{ hash.substring(0, 7) }}</CommitHash>
          <CommitSeparator />
          <CommitTimestamp :date="timestamp" />
        </CommitMetadata>
      </CommitInfo>
      <CommitActions>
        <CommitCopyButton
          :hash="hash"
          @copy="handleCopy"
        />
      </CommitActions>
    </CommitHeader>
    <CommitContent>
      <CommitFiles>
        <CommitFile
          v-for="file in files"
          :key="file.path"
        >
          <CommitFileInfo>
            <CommitFileStatus :status="file.status" />
            <CommitFileIcon />
            <CommitFilePath>{{ file.path }}</CommitFilePath>
          </CommitFileInfo>
          <CommitFileChanges>
            <CommitFileAdditions :count="file.additions" />
            <CommitFileDeletions :count="file.deletions" />
          </CommitFileChanges>
        </CommitFile>
      </CommitFiles>
    </CommitContent>
  </Commit>
</template>
