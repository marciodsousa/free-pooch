import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, ADD_DUMB_RESULTS
} from '../actions'

const initialState = {
    results: []
  };

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = initialState, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
      case ADD_DUMB_RESULTS:
        const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
       const newResults = Object.assign({}, state, {
            results: state.results.concat([utc])
        });
        return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            items: action.posts,
            lastUpdated: action.receivedAt,
            results: state.results.concat([utc])
        }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer
