import type Button from '@repo/shadcn-vue/components/ui/button/Button.vue'
import type { LucideIcon } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'

export type ArtifactProps = HTMLAttributes
export type ArtifactHeaderProps = HTMLAttributes
export type ArtifactCloseProps = InstanceType<typeof Button>
export type ArtifactTitleProps = HTMLAttributes
export type ArtifactDescriptionProps = HTMLAttributes
export type ArtifactActionsProps = HTMLAttributes
export type ArtifactActionProps = InstanceType<typeof Button> & {
  tooltip?: string
  label?: string
  icon?: LucideIcon
}

export type ArtifactContentProps = HTMLAttributes
