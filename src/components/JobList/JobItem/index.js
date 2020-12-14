import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// moment(post.createdAt).fromNow()
const JobItem = ({ job }) => {
  return (
    <div className="job-card">
      <div className="title">
        <Link to={`/job/${job.id}`}>
          <h4>{job.title}</h4>
        </Link>
        <p>
          {job.company} - <strong>{job.type}</strong>{' '}
        </p>
      </div>
      <div className="meta">
        <span>{job.location}</span>
        <span>{moment(job.created_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default JobItem;
