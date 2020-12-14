import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { JobContext } from '../../context/jobContext';
import { API } from './../../config/api';

const SearchBar = () => {
  const [queryData, setQueryData] = useState({
    description: '',
    location: '',
    full_time: false,
  });
  const location = useLocation();
  const history = useHistory();
  const { dispatch } = useContext(JobContext);

  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    const queryString = location.search;
    console.log(queryString);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, location, full_time } = queryData;
    let searchString = `${description && 'description=' + description + '&'}${
      location && 'location=' + location + '&'
    }${full_time === true ? 'full_time=' + full_time : ''}`;

    history.push({
      pathname: '',
      search:
        searchString[searchString.length - 1] === '&'
          ? searchString.slice(0, searchString.length - 1)
          : searchString,
    });

    const getJobs = async () => {
      try {
        dispatch({
          type: 'FETCH_JOBS',
        });

        let url = searchString ? `/search?${searchString}` : '/search';

        const { data } = await API.get(url);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getJobs();
  };
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div>
          <p>Job Description</p>
          <input
            type="text"
            placeholder="Filter by title, benefits, companies, expertise"
            value={queryData.description}
            onChange={(e) =>
              setQueryData({ ...queryData, description: e.target.value })
            }
          />
        </div>
        <div>
          <p>Location</p>
          <input
            type="text"
            placeholder="Filter by citym state, zip code or country"
            value={queryData.location}
            onChange={(e) =>
              setQueryData({ ...queryData, location: e.target.value })
            }
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="full_time"
              // value={queryData.full_time}
              checked={queryData.full_time}
              onChange={(e) =>
                setQueryData({ ...queryData, full_time: e.target.checked })
              }
            />
            Full Time Only
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
