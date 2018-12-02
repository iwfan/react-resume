import React, { PureComponent } from 'react'
import AutoAdjustScrollHOC from './AutoAdjustScrollHOC'
import marked from 'marked'
import 'github-markdown-css'

class Resume extends PureComponent {
  render() {
    return (
      <div
        className='resume markdown-body'
        ref={this.props.forwardRef}
        dangerouslySetInnerHTML={{
          __html: marked(this.props.content)
        }}
      />
    )
  }
}

export default AutoAdjustScrollHOC(Resume)
