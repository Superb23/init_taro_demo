import { ChatMessage } from "@/types/chat";
import { View, Text, ScrollView } from "@tarojs/components";
import { FC, memo, useEffect, useState } from "react";
import Taro from '@tarojs/taro'

import './index.less';

interface ChatContentProps {
  data: ChatMessage[];
  lastAnswer: string;
}

export const ChatContent: FC<ChatContentProps> = memo(({ data, lastAnswer }) => {
  const [scrollTop, setScrollTop] = useState(0)

  
  useEffect(() => {
    Taro.createSelectorQuery().select('#chat-container').boundingClientRect().exec((rect) => {
      setScrollTop(rect[0].height)
    })
  }, [lastAnswer])

  return (
    <ScrollView className='chat-content' scrollY showScrollbar={false} scrollTop={scrollTop}>
      <View id='chat-container'>
        {
          data.map((item, index) => {
            return (
              <View key={item.content} className='chat-content-item' id={`item_${index}`}>
                <Text>{item.content}</Text>
              </View>
            )
          })
        }
        <View className='chat-content-item' id='item_lastAnswer'>
          <Text>{lastAnswer}</Text>
        </View>
      </View>
    </ScrollView>
  )
})