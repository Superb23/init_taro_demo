import { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import * as TextEncoding from 'text-encoding-shim'
import { ChatMessage, INQUIRY_TYPE } from '@/types/chat'
import { AVATAR_URL } from '@/constants/url'

import { ChatContent } from './chat-content'
import './index.less'

export default function Index() {
  // 输入
  const [inputValue, setInputValue] = useState('')
  // 输出
  const [answer, setAnswer] = useState('')
  // 聊天记录
  const [chatData, setChatData] = useState<ChatMessage[]>([])
  // 是否正在回答
  const [isAnswering, setIsAnswering] = useState(false)
  // 记录添加控制
  const isAddRecord = useRef(false)

  // 搜索
  const handleSearch = useCallback(async () => {
    if (!inputValue || isAnswering) {
      return
    }
    // 清空输入框、添加聊天记录、设置状态正在回答
    setInputValue('')
    setChatData([
      ...chatData,
      {
        type: INQUIRY_TYPE.INIT,
        name: '我',
        avatar: AVATAR_URL[INQUIRY_TYPE.INIT],
        content: inputValue,
      },
    ])
    setIsAnswering(true)

    const requestTask = Taro.request({
      url: `http://localhost:3000/inquery/chat?query=${inputValue}`,
      method: 'GET',
      // 类似于stream
      enableChunked: true,
      success() {
        setIsAnswering(false)
        isAddRecord.current = false
      },
      fail(e) {
        setIsAnswering(false)
        isAddRecord.current = false
        console.log('request fail', e)
      },
    })
    // 监听返回数据  转码、拼接
    requestTask.onChunkReceived((res) => {
      const resStr = new TextEncoding.TextDecoder('utf-8').decode(new Uint8Array(res.data))
      setAnswer((prevAnswer) => prevAnswer + resStr)
    })
  }, [inputValue, isAnswering, chatData])

  useEffect(() => {
    if (!isAnswering && chatData.length > 0 && !isAddRecord.current) {
      isAddRecord.current = true
      setAnswer('')
      setChatData([
        ...chatData,
        {
          type: INQUIRY_TYPE.REPLY,
          name: '机器人',
          avatar: AVATAR_URL[INQUIRY_TYPE.REPLY],
          content: answer,
        },
      ])
    }
  }, [isAnswering, answer, chatData])

  return (
    <View className='container'>
      <ChatContent data={chatData} lastAnswer={answer} isAnswering={isAnswering} />
      <View className='input-area'>
        <Input
          className='search-input'
          confirmType='search'
          placeholder={isAnswering ? '正在回答中...' : '请输入'}
          value={inputValue}
          disabled={isAnswering}
          onInput={(e) => setInputValue(e.detail.value)}
        />
        <Text className='search-btn' onClick={handleSearch}>
          搜索
        </Text>
      </View>
    </View>
  )
}
