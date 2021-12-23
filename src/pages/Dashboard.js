import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, fetchingUser, userSelector } from '../features/user/userSlice';
import Loader from '../component/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isFetching, data, isError, errorMessage } = useSelector(userSelector);
  useEffect(()=> {
    dispatch(fetchingUser({token: localStorage.getItem('token')}));
  }, []);

  useEffect(()=> {
    if(isError) {
      dispatch(clearState());
      console.log(errorMessage);
    }
  }, [isError]);
  return (
    <div className="flex justify-center items-center h-full">
      {isFetching ? <Loader /> : <div><h1 className="sm:text-3xl text-xl break-words text-gray-900">Welcome back {data.name} !</h1></div>}
    </div>
  )
}

export default withRouter(Dashboard);