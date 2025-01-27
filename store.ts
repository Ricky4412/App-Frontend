import { createStore } from 'redux';
import rootReducer from './reducers/reducerIndex'

// Define the store type
const store = createStore(rootReducer);

export default store;