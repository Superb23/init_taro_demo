import { ChatMessage, INQUIRY_TYPE } from '@/types/chat'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import Taro from '@tarojs/taro'
import { Loading } from '@/components/loading'
import { AVATAR_URL } from '@/constants/url'

import './index.less'

interface ChatContentProps {
  data: ChatMessage[]
  isAnswering: boolean
  lastAnswer: string
}

export const ChatContent: FC<ChatContentProps> = memo(({ data, isAnswering, lastAnswer }) => {
  const [scrollTop, setScrollTop] = useState(0)

  const answerContent = useMemo(
    () =>
      isAnswering ? (
        <View className='chat-content-item chat-content-item-left'>
          <Image className='chat-content-item-avatar' src={AVATAR_URL[INQUIRY_TYPE.REPLY]} />
          {!lastAnswer ? (
            <Loading size={24} color='#fff'>
              加载中...
            </Loading>
          ) : (
            <View className='chat-content-item-content'>
              <Text userSelect>{lastAnswer}</Text>
              <Loading size={18} color='#fff' style={{ marginLeft: '4px' }} />
            </View>
          )}
        </View>
      ) : null,
    [isAnswering, lastAnswer],
  )

  useEffect(() => {
    Taro.createSelectorQuery()
      .select('#chat-container')
      .boundingClientRect()
      .exec((rect) => {
        setScrollTop(rect[0].height + 100)
      })
  }, [lastAnswer, data])

  return (
    <ScrollView className='chat-content' scrollY showScrollbar={false} enhanced scrollTop={scrollTop}>
      <View id='chat-container'>
        {data.map((item) => {
          return item.type === INQUIRY_TYPE.INIT ? (
            <View key={item.content} className='chat-content-item chat-content-item-right'>
              <View className='chat-content-item-content'>
                <Text userSelect>{item.content}</Text>
              </View>
              <Image className='chat-content-item-avatar' src={item.avatar} />
            </View>
          ) : (
            <View key={item.content} className='chat-content-item chat-content-item-left'>
              <Image className='chat-content-item-avatar' src={AVATAR_URL[INQUIRY_TYPE.REPLY]} />
              <View className='chat-content-item-content'>
                <Text userSelect>{item.content}</Text>
              </View>
            </View>
          )
        })}
        {answerContent}
      </View>
    </ScrollView>
  )
})
