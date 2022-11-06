import React, {createContext, useReducer, useContext} from 'react';
import reducers from './reducers';

const initialState = {
  user: {loading: false, error: null, data: []},
  data: {loading: false, error: null, data: []},
};

export const Context = createContext();

export const ContextProvider = (props) => {
  return (
    <Context.Provider value={useReducer(reducers, initialState)}>
      {props.children}
    </Context.Provider>
  );
};

export const useStateValue = () => useContext(Context);
