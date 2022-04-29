import { setGlobalError, setGlobalReset, setGlobalIsLoading } from '../slice/global-slice'

const globalMiddleware = (store) => (next) => (action) => {

  next(action);
  if(action.type.endsWith('/pending')) {
    store.dispatch(setGlobalIsLoading(true));
    store.dispatch(setGlobalError(null));
  }
  if(action.type.endsWith('/fulfilled')) {
    store.dispatch(setGlobalIsLoading(false));
    store.dispatch(setGlobalError(null));
  }
  if(action.type.endsWith('/rejected')) {
    store.dispatch(setGlobalIsLoading(false));
    store.dispatch(setGlobalError(action.payload));
  }
  // localStorage.setItem('root', JSON.stringify(store.getState()));
}

const middleware = [globalMiddleware];
export default middleware;