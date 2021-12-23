import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, userSelector, clearState } from '../features/user/userSlice';

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState([]);
  const dispatch = useDispatch();
  const {isSuccess, isError, errorMessage, isFetching} = useSelector(userSelector);

  const handleSubmit = () => {
    dispatch(loginUser({email, password}));
  }

  useEffect(()=> {
    return ()=> {
      console.log('effect')
      dispatch(clearState())
    }
  }, [])

  useEffect(()=> {
    if(isSuccess) {
      dispatch(clearState());
      history.go(0);
    } 
    if(isError) {
      setMessage(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-bl from-red-50 to-purple-100">
      <div className="bg-purple-100 py-4 px-8 shadow-md border-t-2 border-l-2 border-white">
        <div className="mb-8 flex justify-center">
          <h1>Login to MyApp</h1>
        </div>
        <div className="mb-4">
          <form>
            {/* email */}
            <div className="mb-4 flex flex-col">
              <input type="email" className="p-2 rounded-md focus:ring-2 ring-purple-400 outline-none" name="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
              {message.email && <span className="text-red-500 text-sm">{message.email[0]}</span>}
            </div>
            {/* password */}
            <div className="mb-4 flex flex-col">
              <input type="password" className="p-2 rounded-md focus:ring-2 ring-purple-400 outline-none" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
              {message.password && <span className="text-red-500 text-sm">{message.password[0]}</span>}
            </div>
            <div className="mb-4 flex justify-between">
              {/* register button */}
              <button type="button" onClick={()=> history.push('/register')} className="text-sm text-purple-700">Register</button>
              {/* forgot password button */}
              <button type="button" className="text-sm text-purple-700">Forgot Password</button>
            </div>
            {/* login button */}
            <button type="button" className="bg-purple-700 text-white py-1 w-full rounded-md hover:bg-purple-800 flex justify-center items-center" onClick={handleSubmit}>
              {isFetching && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
              Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login);