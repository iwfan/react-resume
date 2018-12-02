import React, { PureComponent } from 'react'
import AutoAdjustScrollHOC from './AutoAdjustScrollHOC'
import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

class Editor extends PureComponent {
  componentDidUpdate() {
    Prism.highlightAll()
  }
  render() {
    const className = `language-css ${
      this.props.enableLineNum ? 'line-numbers' : ''
    }`
    return (
      <section className='editor' ref={this.props.forwardRef}>
        <pre className={className}>
          <code
            className='language-css'
          >
            {this.props.code + '\n\n\n\n'}
          </code>
        </pre>
        <style>{this.props.code}</style>
      </section>
    )
  }
}

export default AutoAdjustScrollHOC(Editor)
