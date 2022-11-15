import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import { thunkGetAllWatchlist, thunkUpdateWatchlist } from '../../store/watchlist';

const WatchlistForm = ({id}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const  watchlistId  = id
  const watchlist = useSelector(state => state.watchlist)
  const user_id = useSelector(state => state.session.user.id)
  const [name, setName] = useState("")
  let stocks
  let lists
  const submitHandler = async (e) => {
    e.preventDefault()

    let list = {
      name,
      watchlistId
    }

    await dispatch(thunkUpdateWatchlist(list))
    await dispatch(thunkGetAllWatchlist(user_id))
    history.push(`/watchlists/${watchlistId}`)
  }

  return <div>
    <form onSubmit={submitHandler}>
    <input
    type="text"
    name="name"
    onChange={(e) => setName(e.target.value)}
    value={name}
    />
    <button type="submit">Add List</button>
    </form>
  </div>
}

export default WatchlistForm
