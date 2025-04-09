import Taro from '@tarojs/taro'
import * as TextEncoding from 'text-encoding-shim'

export const eventSource = (
  url: string,
  onMessage: (data: any) => void,
  onError: (error: any) => void,
  onComplete: () => void
) => {
  const requestTask = Taro.request({
    url,
    method: 'GET',
    enableChunked: true,
    header: { 'Content-Type': 'application/json' },
    success(res) {
      console.log('request success', res)
    },
    fail(e) {
      onError(e)
    },
    complete(res) {
      console.log('request complete', res)
    },
  })
  requestTask.onChunkReceived((res) => {
    console.log('onChunkReceived', res)
    const resStr = new TextEncoding.TextDecoder('utf-8').decode(
      new Uint8Array(res.data)
    )
    onMessage(resStr)
  })
}
