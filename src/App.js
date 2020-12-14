import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import { setAuthToken, API } from './config/api';
import { UserContext } from './context/userContext';
// import Login from './components/Login';
import Auth from './pages/Auth';
import PrivateRoute from './components/PrivateRoute/index';
import Search from './pages/Search';
import DetailJob from './pages/DetailJob/index';

if (localStorage.token) setAuthToken(localStorage.token);

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Auth />
      </Route>
      <PrivateRoute exact path="/search">
        <Search />
      </PrivateRoute>
      <PrivateRoute exact path="/job/:id">
        <DetailJob />
      </PrivateRoute>
    </Switch>
  );
};

function App() {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await API.get('/auth/check-auth');
        dispatch({
          type: 'USER_LOADED',
          payload: data.user,
        });
        console.log('data: ', data);
      } catch (err) {
        console.log(err);
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    };
    loadUser();
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
