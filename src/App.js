import React, { Component } from 'react'
import Editor from './components/Editor'
import Resume from './components/Resume'
import './App.css'

/** 加载文本文件 */
const loadRawFile = require.context('!raw-loader!./', true, /\.(md|css|txt)$/)
const introCss = loadRawFile('./styles/intro.css')
const setEditorCss = loadRawFile('./styles/setEditor.css')
const setResumeEditorCss = loadRawFile('./styles/setResumeEditor.css')
const endCss = loadRawFile('./styles/end.css')
const md = loadRawFile('./resume.md')

const timeout = async ms => new Promise(resolve => setTimeout(resolve, ms))

class App extends Component {
  speed = {
    slow: 90,
    mid: 40,
    fast: 10
  }
  state = {
    styleCode: '',
    speed: this.speed.fast,
    pause: false,
    markdown: '',
    enableLineNum: false
  }
  componentDidMount() {
    this.makeResume()
  }
  async makeResume() {
    await this.progressiveShowWord(introCss, this.state.speed, 'styleCode')
    await timeout(500)
    await this.progressiveShowWord(setEditorCss, this.state.speed, 'styleCode')
    this.setState({ enableLineNum: true })
    await timeout(500)
    await this.progressiveShowWord(
      setResumeEditorCss,
      this.state.speed,
      'styleCode'
    )
    await this.progressiveShowWord(md, this.state.speed, 'markdown')
    await timeout(500)
    await this.progressiveShowWord(endCss, this.state.speed, 'styleCode')
  }
  async progressiveShowWord(text, speed, target) {
    return new Promise(resolve => {
      let timer = null
      let wordCount = 0
      timer = setInterval(() => {
        if (this.state.pause) {
          return
        }
        this.setState(
          prev => {
            return { [target]: prev[target] + text.substr(wordCount, 1) }
          },
          () => {
            if (wordCount >= text.length) {
              clearInterval(timer)
              resolve()
            }
            wordCount += 1
          }
        )
      }, speed)
    })
  }
  render() {
    return (
      <React.StrictMode>
        <div className='App'>
          <Editor code={this.state.styleCode} enableLineNum={this.state.enableLineNum} forwardRef={this.codeRef} />
          <Resume content={this.state.markdown} forwardRef={this.mdRef} />
        </div>
      </React.StrictMode>
    )
  }
}

export default App
