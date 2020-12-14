import React from 'react';
import JobList from '../../components/JobList';
import SearchBar from '../../components/SearchBar';

const Home = () => {
  return (
    <div className="container">
      <h1>Search Page</h1>
      <SearchBar />
      <JobList />
    </div>
  );
};

export default Home;
