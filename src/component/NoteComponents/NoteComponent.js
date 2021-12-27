import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

function NoteComponent(props) {
  const openModal = () => {
    props.setUpdateModal(!props.updateModal)
  }
  const deleteHandle = ()=> {
    const condition = window.confirm('Are you sure want to delete ?');
    if(condition === true) {
      api().delete('api/note/' + props.id, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
          props.setRefresh(old => old + 1);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      console.log('canceled')
    }
  }
  return (
    <div>
      <div className="flex flex-col justify-between m-2 shadow-md rounded-md p-1 h-64 w-56 bg-indigo-300 transition transform hover:scale-105 group relative">
        <div className="flex flex-col">
          <div className="mb-1">
            <h3 className="font-medium">{props.title}</h3>
          </div>
          <div className="overflow-hidden relative h-56">
            <div className="absolute bg-gradient-to-t from-indigo-300 to-transparent pointer-events-none bottom-0 left-0 right-0 top-16"></div>
            <p className="">{props.body}</p>
          </div>
        </div>
        <div className="absolute bottom-2 left-2">
          <p className="text-sm text-gray-700">{moment(props.updated_at).format('MMMM D YYYY')}</p>
        </div>
        <Link to={'/note/' + props.id}><div onClick={openModal} className="group-hover:bg-black absolute inset-0 group-hover:opacity-30 rounded-md flex justify-center items-center cursor-pointer">
          <i className="bi bi-pencil-square text-7xl text-white opacity-0 group-hover:opacity-100"></i>
        </div></Link>
        <button type="button" className="z-10 absolute rounded-full bg-red-400 w-12 h-12 flex justify-center items-center bottom-2 right-2 sm:opacity-0 opacity-90 group-hover:opacity-90 hover:bg-red-500 shadow-md" onClick={deleteHandle}>
          <i className="bi bi-trash-fill text-white text-3xl"></i>
        </button>
      </div>
    </div>
  )
}

export default NoteComponent
