import { createStore } from 'redux';
import reducers from './reducers/root-reducer';

let store = createStore(reducers);


export default store;