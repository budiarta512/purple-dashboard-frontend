import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../features/user/userSlice';
import api from '../utils/api';
import GreenAlertComponent from './GreenAlertComponent';


const CreateNoteComponent = (props) => {
  
  const {data} = useSelector(userSelector);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState([]);
  const [response, setResponse] = useState([]);
  const [spiner, setSpiner] = useState(false);
  const user_id = data.id;

  const postHandle = ()=> {
    setSpiner(true)
    api().post('/api/note', {title, category, body, user_id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res=> {
          setResponse(res.data);
          setTitle('');
          setBody('');
          setSpiner(true);
          props.setOpen(!props.open);
          props.setRefresh((old)=> old + 1);
      })
      .catch(error => {
        if(error.response.status === 400) {
          setMessage(error.response.data.message)
        }
      })
  }
  if(response.message) {
    setTimeout(()=> {
      setResponse([]);
    }, 3000)
  }
  return (
    <div className="w-5/6 h-auto bg-indigo-300 shadow-xl rounded-md px-4 border-t border-l border-white">
      {/* success alert */}
      {response.message && <GreenAlertComponent message={response.message} />}
      
      <div className="flex justify-end">
        <button type="button" className="mt-1 mr-1" onClick={()=> props.setOpen(!props.open)}><i className="bi bi-x-circle-fill text-2xl text-purple-700"></i></button>
      </div>
      <form className="p-2">
        {/* title */}
        <div className="mb-2">
          <input type="text" id="title" className="bg-indigo-200 p-2 w-full border-t-2 border-l-2 shadow-md border-gray-100 rounded-md focus:ring-2 ring-purple-400 outline-none opacity-70" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)} />
          {/* error handling */}
          {message.title && <span className="text-red-500 text-sm">{message.title[0]}</span>}
        </div>
        {/* category */}
        <div className="mb-2 flex">
          <div className="flex items-center mr-2">
            <input type="radio" id="personal" name="category" value="personal" defaultChecked={true} onChange={(e)=> setCategory(e.target.value)} />
            <label htmlFor="personal">Personal</label>
          </div>
          <div className="flex items-center mr-2">
            <input type="radio" id="business" name="category" value="business" onChange={(e)=> setCategory(e.target.value)} />
            <label htmlFor="business">Business</label>
          </div>
          <div className="flex items-center mr-2">
            <input type="radio" id="project" name="category" value="project" onChange={(e)=> setCategory(e.target.value)} />
            <label htmlFor="project">Project</label>
          </div>
        </div>
        {/* body */}
        <div className="mb-2">
          <textarea name="body" id="body" rows="12" className="bg-indigo-200 w-full overflow-y-auto p-2 border-t-2 border-l-2 shadow-md border-gray-100 rounded-md focus:ring-2 ring-purple-400 outline-none opacity-70" placeholder="Write your note" value={body} onChange={(e)=> setBody(e.target.value)} ></textarea>
          {/* error handling */}
          {message.body && <span className="text-red-500 text-sm">{message.body[0]}</span>}
        </div>
        <div className="mb-1 flex justify-end">
          <button type="button" className="mr-4 text-purple-700 font-medium">Cancel</button>
          <button type="button" className="bg-purple-500 text-white py-1 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center" onClick={postHandle}>{spiner && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNoteComponent;