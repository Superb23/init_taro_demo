import { INQUIRY_TYPE } from '@/types'
import { AVATAR_URL } from '.'

/** ai聊天初始 */
export const CHAT_INIT = {
  type: INQUIRY_TYPE.REPLY,
  name: '机器人',
  avatar: AVATAR_URL[INQUIRY_TYPE.REPLY],
  content: '您好呀，我是AI助手superb，有什么可以帮您？',
}
