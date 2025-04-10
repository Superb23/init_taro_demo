import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='container'>
      <View className='content'>
        <Text>个人中心</Text>
      </View>
    </View>
  )
}

definePageConfig({
  navigationBarTitleText: '个人中心',
})
