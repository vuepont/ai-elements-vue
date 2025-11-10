import type Button from '@repo/shadcn-vue/components/ui/button/Button.vue'
import type { LucideIcon } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'

type ButtonProps = InstanceType<typeof Button>['$props']

export type ArtifactProps = HTMLAttributes
export type ArtifactHeaderProps = HTMLAttributes
export type ArtifactCloseProps = ButtonProps
export type ArtifactTitleProps = HTMLAttributes
export type ArtifactDescriptionProps = HTMLAttributes
export type ArtifactActionsProps = HTMLAttributes
export type ArtifactActionProps = ButtonProps & {
  tooltip?: string
  label?: string
  icon?: LucideIcon
}

export type ArtifactContentProps = HTMLAttributes
