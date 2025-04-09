/* eslint-disable import/first */
import { useCallback, useEffect, useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { ChatContent } from './chat-content'
import { ChatMessage, INQUIRY_TYPE } from '../../types/chat'
import Taro from '@tarojs/taro'
import * as TextEncoding from 'text-encoding-shim'

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

  const handleSearch = useCallback(async() => {
    if (!inputValue) {
      return
    }
    setInputValue('')
    setChatData(prevChatData => [...prevChatData, {
      type: INQUIRY_TYPE.INIT,
      name: '我',
      avatar: '',
      content: inputValue,
    }])
    setIsAnswering(true)
    
    const requestTask = Taro.request({
      url: `http://localhost:3000/inquery/chat?query=${inputValue}`,
      method: 'GET',
      enableChunked: true,
      success(res) {
        console.log('request success', res)
        console.log('chatData++++', chatData)
        setIsAnswering(false)
      },
      fail(e) {
        setIsAnswering(false)
        console.log('request fail', e)
      },
    })
    requestTask.onChunkReceived((res) => {
      console.log('onChunkReceived', res)
      const resStr = new TextEncoding.TextDecoder('utf-8').decode(
        new Uint8Array(res.data)
      )
      setAnswer(prevAnswer => prevAnswer + resStr)
    })
  }, [chatData, inputValue])

  useEffect(() => {
    if (!isAnswering) {
      setAnswer('')
      setChatData(prevChatData => [...prevChatData, {
        type: INQUIRY_TYPE.REPLY,
        name: '机器人',
        avatar: '',
        content: answer,
      }])
    }
  }, [isAnswering, answer])

  return (
    <View className='container'>
      <ChatContent data={chatData} lastAnswer={answer} />
      <View className='input-area'>
        <Input confirmType='search' placeholder='请输入' value={inputValue} onInput={(e) => setInputValue(e.detail.value)} />
        <Text className='search-btn' onClick={handleSearch}>搜索</Text>
      </View>
    </View>
  )
}


