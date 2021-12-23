import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import api from '../utils/api';
import NoteComponent from '../component/NoteComponent';
import CreateNoteComponent from '../component/CreateNoteComponent';
import Loader from '../component/Loader';

const Note = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [response, setResponse] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(response);

  useEffect(() => {
    setLoading(true);
    api().get('/api/note', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
      .then(res => {
        console.log(res)
        setResponse(res.data.data)
        setLoading(false);
        setSelected(res.data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [refresh]);

  useEffect(()=> {
    if(filter !== 'all') {
    const res = response.filter(data => data.category === filter);
    setSelected(res);
    } else {
      setSelected(response);
    }
  }, [filter])
  
  return (
    <div className="h-full sm:m-4 mx-2">
      <h1 className="mb-4">halaman note</h1>
      <div className="sm:flex block justify-between mb-4">
        <ul className="flex mb-4 sm:mb-0">
          <li className={`transition hover:text-purple-700 ${filter === 'all' ? 'bg-purple-400 text-white rounded-sm' : ''}`}><button type="button" className="py-1 sm:px-5 px-3 " onClick={()=> setFilter('all')}>All</button></li>
          <li className={`transition hover:text-purple-700 ${filter === 'personal' ? 'bg-purple-400 text-white rounded-sm' : ''}`}><button type="button" className="py-1 sm:px-5 px-3 " onClick={()=> setFilter('personal')}>Personal</button></li>
          <li className={`transition hover:text-purple-700 ${filter === 'business' ? 'bg-purple-400 text-white rounded-sm' : ''}`}><button type="button" className="py-1 sm:px-5 px-3 " onClick={()=> setFilter('business')}>Business</button></li>
          <li className={`transition hover:text-purple-700 ${filter === 'project' ? 'bg-purple-400 text-white rounded-sm' : ''}`}><button type="button" className="py-1 sm:px-5 px-3 " onClick={()=> setFilter('project')}>Project</button></li>
        </ul>
        <div className="py-1 text-purple-600">
          <button type="button" onClick={()=> setOpen(!open)}><i className="bi bi-plus-circle pr-2"></i>Add new note</button>
        </div>
      </div>
      {/* note */}
      {loading ? <Loader position="transform -translate-y-32" /> : 
      <div className="overflow-y-auto h-4/6">
        <div className="flex flex-wrap justify-center h-full sm:mx-0 mx-2">
          {selected.map((res)=> {
            return (
              <NoteComponent key={res.id} title={res.title} body={res.body} updated_at={res.updated_at} setUpdateModal={setUpdateModal} updateModal={updateModal} id={res.id} setRefresh={setRefresh} />
            )
          })}
        </div>
      </div>
      }
      
     {/*  create Note Modal  */}
      <div className={!open
      ? "hidden fixed bg-transparent inset-0"
      : "fixed bg-transparent backdrop-blur-xs backdrop-filter inset-0 flex justify-center items-center"}>
        <CreateNoteComponent setOpen={setOpen} setRefresh={setRefresh} open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default withRouter(Note);