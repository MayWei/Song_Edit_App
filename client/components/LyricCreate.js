import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LyricCreates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }

  onSubmitHandler(event) {
    event.preventDefault()
    this.props.mutate({
      variables: {
        songId: this.props.id,
        content: this.state.content,
      },
    })
    //.then(() => this.props.data.refetch())
    this.setState({ content: '' })
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler.bind(this)}>
        <label>Add a lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => {
            this.setState({ content: event.target.value })
          }}
        ></input>
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
      }
    }
  }
`

export default graphql(mutation)(LyricCreates)
