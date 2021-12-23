import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Note from './pages/Note';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import Sidebar from './component/Sidebar';
import { isLogin } from './utils/auth';
import PrivateRoute from './utils/PrivateRoute';
import { UserProvider } from './context/UserContext';
import NavbarComponent from './component/NavbarComponent';
import UpdateNoteComponent from './component/UpdateNoteComponent';
import Music from './pages/Music';

function App() {
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  // axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  // axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
  
  return (
    <div className="App">
      <Router>
        <UserProvider>
          {!isLogin() ? (
            <Switch>
            <Route path='/login'>
            {!isLogin() ? <Login /> : <Redirect to='/' />}
            </Route>
            <Route path='/register'>
            {!isLogin() ? <Register /> : <Redirect to='/' />}
            </Route>
            <PrivateRoute path='/' exact component={Dashboard} />
            <PrivateRoute path='/note' component={Note} />
            <PrivateRoute path='/note/:id' component={UpdateNoteComponent} />
            <PrivateRoute path='/music' component={Music} />
          </Switch>
          ) : 
          (
            <div className="flex min-h-screen overflow-hidden">
              {/* Sidebar */}
              <Sidebar />
              <div className="bg-gradient-to-bl from-red-50 to-purple-100 w-screen h-screen">
                {/* Navbar */}
                <NavbarComponent />
                {/* Content */}
                <div className="h-full ">
                  <Switch>
                    <Route path='/login'>
                    {!isLogin() ? <Login /> : <Redirect to='/' />}
                    </Route>
                    <Route path='/register'>
                    {!isLogin() ? <Register /> : <Redirect to='/' />}
                    </Route>
                    <PrivateRoute path='/' exact component={Dashboard} />
                    <PrivateRoute path='/note' exact component={Note} />
                    <PrivateRoute path='/note/:id' component={UpdateNoteComponent} />
                    <PrivateRoute path='/music' component={Music} />
                  </Switch>
                </div>
              </div>
            </div>
          )}
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
