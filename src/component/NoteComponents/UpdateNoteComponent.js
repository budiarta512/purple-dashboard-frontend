import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/user/userSlice';
import { useHistory, withRouter } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import api from '../../utils/api';
import Loader from '../Loader';

const UpdateNoteComponent = () => {
  
  const {data} = useSelector(userSelector);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [body, setBody] = useState('');
  const user_id = data.id;
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [spiner, setSpiner] = useState(false);

  const history = useHistory();

  let {id} = useParams();

  useEffect(() => {
    setLoading(true)
    api().get('/api/note/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
      .then(res => {
        setResponse(res.data.data);
        setTitle(res.data.data.title)
        setBody(res.data.data.body);
        setLoading(false)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  const updateHandle = ()=> {
    setSpiner(true)
    api().put('/api/note/' + id, {title, category, body, user_id}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
      .then(res=> {
        setSpiner(false);
        history.push('/note')
      })
      .catch(error => {
        setMessage(error.response.data.message)
        setSpiner(false);
      });
  }
  return (
    loading ? <Loader /> :
    <div className="fixed bg-transparent backdrop-blur-xs backdrop-filter inset-0 flex justify-center items-center">
      <div className="w-5/6 h-auto bg-indigo-300 shadow-xl rounded-md px-4 border-t border-l border-white">
        <div className="flex justify-end">
          <Link to='/note' className="mt-1 mr-1"><i className="bi bi-arrow-left-circle-fill text-2xl text-purple-700"></i></Link>
        </div>
        <form className="p-2">
          {/* title */}
          <div className="mb-2">
            <input type="text" id="title" className="bg-indigo-200 p-2 w-full border-t-2 border-l-2 shadow-md border-gray-100 rounded-md focus:ring-2 ring-purple-400 outline-none opacity-70" defaultValue={response.title} placeholder="Title" onChange={(e)=> setTitle(e.target.value)} />
            {/* error handling */}
            {message.title && <span className="text-red-500 text-sm">{message.title[0]}</span>}
          </div>
          {/* category */}
          <div className="mb-2 flex">
            <div className="flex items-center mr-2">
              <input type="radio" id="personal" name="category" value="personal" defaultChecked={response.category === 'personal' ? true : false} onChange={(e)=> setCategory(e.target.value)} />
              <label htmlFor="personal">Personal</label>
            </div>
            <div className="flex items-center mr-2">
              <input type="radio" id="business" name="category" value="business" defaultChecked={response.category === 'business' ? true : false} onChange={(e)=> setCategory(e.target.value)} />
              <label htmlFor="business">Business</label>
            </div>
            <div className="flex items-center mr-2">
              <input type="radio" id="project" name="category" value="project" defaultChecked={response.category === 'project' ? true : false} onChange={(e)=> setCategory(e.target.value)} />
              <label htmlFor="project">Project</label>
            </div>
          </div>
          {/* body */}
          <div className="mb-2">
            <textarea name="body" id="body" rows="12" className="bg-indigo-200 w-full overflow-y-auto p-2 border-t-2 border-l-2 shadow-md border-gray-100 rounded-md focus:ring-2 ring-purple-400 outline-none" placeholder="Write your note" defaultValue={response.body} onChange={(e)=> setBody(e.target.value)} ></textarea>
            {/* error handling */}
            {message.body && <span className="text-red-500 text-sm">{message.body[0]}</span>}
          </div>
          <div className="mb-1 flex justify-end">
            <Link to='/note'>
              <button type="button" className="mr-4 text-purple-700 font-medium">Cancel</button>
            </Link>
            <button type="button" className="bg-purple-500 text-white py-1 px-4 rounded-md hover:bg-purple-700 flex justify-center items-center" onClick={updateHandle}>{spiner && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}Edit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(UpdateNoteComponent);