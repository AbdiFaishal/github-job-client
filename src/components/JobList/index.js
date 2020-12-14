import React, { useContext } from 'react';
import { JobContext } from '../../context/jobContext';
import JobItem from './JobItem';

const JobList = () => {
  const { state } = useContext(JobContext);

  console.log('state: ', state);
  return (
    <div className="job-container">
      <h1>Job List</h1>
      {state.loading ? (
        <p>Loading....</p>
      ) : state.jobList.length ? (
        state.jobList.map((job) => <JobItem key={job.id} job={job} />)
      ) : (
        <p>Job List Empty</p>
      )}
    </div>
  );
};

export default JobList;
