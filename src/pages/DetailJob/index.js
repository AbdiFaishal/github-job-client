import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API } from './../../config/api';

import parse from 'html-react-parser';

const DetailJob = () => {
  const [jobDetail, setJobDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getDetailJob = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/job/${id}`);
        setLoading(false);

        setJobDetail(data);
        console.log(data);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    };
    getDetailJob();
  }, [id]);

  if (loading) {
    return <p className="container">Loading...</p>;
  }
  return (
    <div className="container">
      <button onClick={() => history.goBack()}>Go Back</button>

      {/* {loading ? <p>Loading...</p> : } */}

      <div className="inner">
        <p className="supertitle">
          {jobDetail.type ? jobDetail.type : 'Full Time'}
        </p>
        <h1>{jobDetail.title ? jobDetail.title : 'Job Title'}</h1>
        <div className="column-container">
          <div className="column-main">
            {jobDetail.description
              ? parse(jobDetail.description)
              : 'Description...'}
          </div>
          <div className="column-sidebar">Sidebar Column</div>
        </div>
      </div>
    </div>
  );
};

export default DetailJob;
