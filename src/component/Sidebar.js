import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { logoutUser } from '../features/user/userSlice';

function Sidebar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandle = (e) => {
    dispatch(logoutUser({token: localStorage.getItem('token')}))
      .then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.go(0);
      });
  }
  const location = useLocation();
  return (
    <div className="bg-white h-screen lg:w-1/5 md:w-1/4 w-16 overflow-hidden">
      <div className="bg-white text-gray-600 overflow-hidden h-16 w-full flex items-center">
        <div className="w-16 h-full flex items-center justify-center">
          <i className="bi bi-list p-6"></i>
        </div>
        <NavLink to='/'>
          <span className="text-purple-900">Purple Dashboard</span>
        </NavLink>
      </div>
      <ul className="">
        <li className={`text-gray-600 h-16 hover:text-purple-500 ${location.pathname === '/' ? 'text-purple-500' : ''}`}>
          <NavLink to='/' className="flex items-center">
            <i className="bi bi-grid-fill p-6"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className={`text-gray-600 h-16 hover:text-purple-500 ${location.pathname === '/note' ? 'text-purple-500' : ''}`}>
          <NavLink to='/note' className="flex items-center">
            <i className="bi bi-stickies-fill p-6"></i>
            <span>Note</span>
          </NavLink>
        </li>
        <li className={`text-gray-600 h-16 hover:text-purple-500 ${location.pathname === '/music' ? 'text-purple-500' : ''}`}>
          <NavLink to='/music' className="flex items-center">
            <i className="bi bi-vinyl-fill p-6"></i>
            <span>Music</span>
          </NavLink>
        </li>
        <li className={`text-gray-600 h-16 hover:text-purple-500`}>
          <button className="flex items-center" type="submit" onClick={logoutHandle}>
            <i className="bi bi-plug-fill p-6"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
