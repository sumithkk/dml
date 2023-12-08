
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Adjust the path accordingly
import userReducer from './userReducer'; // Adjust the path accordingly

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  // Add other reducers as needed
});

export default rootReducer;