export enum INQUIRY_TYPE {
  /** 用户询问 */
  INIT = 1,
  /** 机器人回复 */
  REPLY = 2,
}

export type ChatMessage = {
  type: INQUIRY_TYPE
  name: string
  avatar: string
  content: string
}
