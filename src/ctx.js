import React, { useReducer, createContext } from "react";

const initialState = {};

const AppCtxt = createContext({});

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function CtxtProvider(props) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  console.log(state, dispatch);
  return <AppCtxt.Provider value={{}} {...props} />;
}

export { AppCtxt, CtxtProvider };
