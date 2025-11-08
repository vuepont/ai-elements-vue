export {
  Action as MessageAction,
  Actions as MessageActions,
} from '../actions'

export {
  Branch as MessageBranch,
  BranchMessages as MessageBranchMessages,
  BranchNext as MessageBranchNext,
  BranchPage as MessageBranchPage,
  BranchPrevious as MessageBranchPrevious,
  BranchSelector as MessageBranchSelector,
} from '../branch'

export {
  Response as MessageResponse,
} from '../response'

export { default as Message } from './Message.vue'
export { default as MessageAvatar } from './MessageAvatar.vue'
export { default as MessageContent } from './MessageContent.vue'
