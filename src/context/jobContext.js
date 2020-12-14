import React, { createContext, useReducer } from 'react';

export const JobContext = createContext();

const initialState = {
  jobList: [],
  totalJobs: 0,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_JOBS':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        jobList: action.payload.data,
        totalJobs: action.payload.totalJobs,
        loading: false,
      };
    default:
      throw new Error();
  }
};

export const JobContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {props.children}
    </JobContext.Provider>
  );
};
