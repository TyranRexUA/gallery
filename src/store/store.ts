import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import imagesReducer from './imageReducer';
import imageModuleWindowReducer from './imageModuleWindow'

const reducers = combineReducers({
    images: imagesReducer,
    imageModuleWindow: imageModuleWindowReducer,
});

export type RootState = ReturnType<typeof reducers>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // ReduxDevTools for Chrome
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)))

export default store;