import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Note from './pages/Note';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './component/Sidebar';
import { isLogin } from './utils/auth';
import PrivateRoute from './utils/PrivateRoute';
import { UserProvider } from './context/UserContext';
import NavbarComponent from './component/NavbarComponent';
import UpdateNoteComponent from './component/NoteComponents/UpdateNoteComponent';
import Music from './pages/Music';
import './App.css';

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
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
            <div className="min-h-screen overflow-hidden">
              {/* Sidebar */}
              <Sidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
              <div className={`absolute bg-gradient-to-bl from-red-50 to-purple-100 h-screen right-0 top-0 transition-all overflow-hidden ${!openSidebar ? 'open-width' : 'sm:w-3/4 w-1/2'}`}>
                {/* Navbar */}
                <NavbarComponent />
                {/* Content */}
                <div className="h-full w-full sm:pt-14 pt-20">
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
