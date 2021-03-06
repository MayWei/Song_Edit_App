import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'

class SongList extends Component {
  clickSongHandler(id) {
    hashHistory.push(`/songs/${id}`)
  }
  //when user click delete, send variables to the mutation
  deleteHandler(id) {
    this.props
      .mutate({
        variables: {
          id,
        },
        // refetchQueries:[{ query }] used mainly when the query process is happened in different components from the current one
      })
      .then(() => this.props.data.refetch())
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li
          key={id}
          className="collection-item"
          onClick={() => this.clickSongHandler(id)}
        >
          {title}
          <i className="material-icons" onClick={() => this.deleteHandler(id)}>
            delete
          </i>
        </li>
      )
    })
  }
  render() {
    console.log(this.props)
    if (this.props.data.loading) {
      return <li>loading</li>
    } else {
      return (
        <div>
          <ul className="collection">{this.renderSongs()}</ul>
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      )
    }
  }
}
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(graphql(query)(SongList))
