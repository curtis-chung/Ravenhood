import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import './WatchlistAddList.css'
import {
  thunkGetAllWatchlist,
  thunkGetOneWatchlist,
  thunkGetAllStocks,
  thunkDeleteStocks,
  thunkDeleteWatchlist,
  thunkPostWatchlist,
  thunkPostStocks
} from '../../store/watchlist';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
// import WatchlistFromModal from '../Watchlist/edit-watchlist-model';

function WatchlistAddList(symbol) {
  const dispatch = useDispatch()
  // const { symbol } = useParams();
  const [add, setAdd] = useState(false);
  const [addListId, setAddListId] = useState()
  const watchlist = useSelector((state) => state.watchlist);
  const user_id = useSelector((state) => state.session.user.id);
  const newLists = useSelector((state) => state.watchlist.AllWatchlists)
  let lists;
  let stocks
  let stockBool = false

  useEffect(
    () => {
      dispatch(thunkGetAllWatchlist(user_id));
      dispatch(thunkGetAllStocks(user_id))
    },
    [dispatch]
  );

  if (watchlist.allWatchlists) {
    lists = Object.values(watchlist.allWatchlists);
  }

  if (watchlist.allStocks) {
    stocks = Object.values(watchlist.allStocks)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    let data = {
      symbol: symbol.symbol,
      watchlist_id: addListId
    }

    await dispatch(thunkPostStocks(data))
    await dispatch(thunkGetAllWatchlist(user_id))
    setAdd(false)
    // history.push(`/watchlists/${watchlistId}`)
  }


  return (
    <div className='watchlist-add-list-page'>
      <button className='add-list-button' onClick={() => add == false ? setAdd(true) : setAdd(false)}>Add to Lists</button>
      {add && <Modal>
        <form className='add-form' onSubmit={submitHandler}>
          <div className='add-form-title'>{`Add ${symbol.symbol} to your list `}</div>
          <div>
            {lists && lists.map((list) => (
              <div className='container'>
                <div hidden={true}>{stockBool = stocks.map(stock => {
                  if (stock.symbol == symbol.symbol && stock.watchlist_id == list.id) {
                    return 'i'
                  } else {
                    return 'o'
                  }
                  // at later date make more elegant solution by joining all stocks to their watchlists in the database.
                })}</div>
                {list.id === user_id?<input type="radio" id={list.id} name={'lists'} disabled={stockBool.includes('i')? true : false} onChange={() => setAddListId(list.id)} value={list.id} />:<div></div>}
                {list.id === user_id?<label className='add-label' for={list.id}> {list.name}</label>: <div></div>}
              </div>
            ))}
          </div>

          <button className="cancel-button" onClick={() => add == false ? setAdd(true) : setAdd(false)}>Cancel</button>
          <button className='create-list-button' type="submit">Add List</button>
        </form>

      </Modal>}
    </div>
  )
}


export default WatchlistAddList
