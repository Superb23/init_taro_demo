import { View } from '@tarojs/components'
import { CSSProperties, FC } from 'react'

import './index.less'

interface LoadingProps {
  size?: number
  color?: string
  className?: string
  children?: string
  style?: CSSProperties
}

export const Loading: FC<LoadingProps> = ({ size = 24, color = '#fff', className = '', children = '', style = {} }) => {
  const spinnerStyle: CSSProperties = {
    width: `${size / 2}px`,
    height: `${size / 2}px`,
    borderColor: `rgba(255, 255, 255, 0.1)`,
    borderLeftColor: color,
    marginRight: `${size / 4}px`,
  }

  return (
    <View className={`loading-container ${className}`} style={style}>
      <View className='loading-spinner' style={spinnerStyle} />
      {children}
    </View>
  )
}
