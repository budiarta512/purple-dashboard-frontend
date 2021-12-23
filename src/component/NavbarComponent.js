import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, fetchingUser, userSelector, logoutUser } from '../features/user/userSlice';
import { useHistory } from 'react-router';

function NavbarComponent() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, isError, errorMessage } = useSelector(userSelector);
  useEffect(()=> {
    dispatch(fetchingUser({token: localStorage.getItem('token')}));
  }, []);

  useEffect(()=> {
    if(isError) {
      dispatch(clearState());
      console.log(errorMessage);
    }
  }, [isError]);

  const history = useHistory();
  const logoutHandle = (e) => {
    dispatch(logoutUser({token: localStorage.getItem('token')}))
      .then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.go(0);
      });
  }
  return (
    <div className="flex w-full bg-white shadow-sm justify-between h-16 items-center">
      <div className="pl-2"><i className="bi bi-search pr-3"></i>Search</div>
      <div className="flex relative">
        <button type="button" className="mx-4 my-auto rounded-full flex items-center" onClick={()=> setOpen(!open)}>
          <i className="bi bi-person-circle text-purple-700 text-xl pr-1"></i>
          <div className={`transform transition ${open ? 'rotate-180' : ''}`}>
            <i className={`bi bi-caret-down-fill text-xs text-purple-700`}></i>
          </div>
        </button>
        <div className={`absolute z-20 transform rounded-md bg-white w-36 right-0 border border-purple-400 transition ${open ? 'opacity-100 translate-y-12 ' : 'opacity-0 pointer-events-none'}`}>
          <ul className="block w-full h-full">
            <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer">{data.name}</li>
            <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Setting</li>
            <li onClick={logoutHandle} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Logout</li>
          </ul>
        </div>
        <div className="mx-4 py-4 my-auto">
          <i className="bi bi-bell text-purple-700 text-xl"></i>
        </div>
      </div>
    </div>
  )
}

export default NavbarComponent
