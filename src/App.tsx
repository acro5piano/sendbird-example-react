import * as React from 'react'

import * as SendBird from 'sendbird'

const sb = new SendBird({
  appId: '9F0BAC98-572F-457B-B0CE-55F334A17550',
})

interface State {}

export default class App extends React.Component<{}, State> {
  render() {
    return <div>hello</div>
  }
}
