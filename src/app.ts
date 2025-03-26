// eslint-disable-next-line import/no-duplicates
import { Component } from 'react'
// eslint-disable-next-line import/no-duplicates
import { PropsWithChildren } from 'react'
import './sdk'

import './app.less'

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
