import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


class App extends Component {
  state = {
    text: '',
    sub: null,
    editorState: EditorState.createEmpty(),

  }

  componentDidMount() {
    window.fetch('http://localhost:3001/notes/1').then(data => {
      data.json().then(res => {
        this.setState({ text: res.text })
      })
    })

    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    const connect = cable.subscriptions.create('NotesChannel', {
      received: this.handleReceiveNewText
    })

    this.setState({ sub: connect })
  }

  handleReceiveNewText = ({ text }) => {
    if (text !== this.state.text) {
      this.setState({ text })
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
    this.state.sub.send({ text: e.target.value, id: 1 })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          value={this.state.text}
          onChange={this.handleChange}
        />
      </div>

    )
  }
}

export default App
