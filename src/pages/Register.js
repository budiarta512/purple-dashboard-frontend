import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
const Register = () => {
  const [name, setName] = useState('');
  const [telp, setTelp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    setLoading(true);
    api().post('/api/register', {name, telp, email, password})
      .then(res => {
        console.log(res);
        setLoading(false);
        history.push('/login')
      })
      .catch(error => {
        if(error.response.status === 400) {
          setMessage(error.response.data.message)
        }
        setLoading(false);
      });
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-bl from-red-50 to-purple-100">
      <div className="bg-purple-100 py-4 px-8 shadow-md border-t-2 border-l-2 border-white">
        <div className="mb-8 flex justify-center">
          <h1>Register</h1>
        </div>
        <div className="mb-4">
          <form>
            <div className="mb-4 flex flex-col">
              <input type="text" className="p-2 rounded-md focus:ring-2 ring-purple-400 outline-none w-64" name="name" onChange={e => setName(e.target.value)} placeholder="Name"/>
              {message.name && <span className="text-red-500 text-sm">{message.name[0]}</span>}
            </div>
            <div className="mb-4 flex flex-col">
              <input type="text" className="p-2 rounded-md focus:ring-2 ring-purple-400 outline-none w-64" name="telp" onChange={e => setTelp(e.target.value)} placeholder="Telp"/>
              {message.telp && <span className="text-red-500 text-sm">{message.telp[0]}</span>}
            </div>
            <div className="mb-4 flex flex-col">
              <input type="email" className="p-2 rounded-md focus:ring-2 ring-purple-400 outline-none w-64" name="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
              {message.email && <span className="text-red-500 text-sm">{message.email[0]}</span>}
            </div>
            <div className="mb-4 flex flex-col">
              <input type="password" className="p-2 rounded-md focus:ring-2 ring-purple-400 outline-none w-64" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
              {message.password && <span className="text-red-500 text-sm">{message.password[0]}</span>}
            </div>
            <div className="mb-4 flex justify-between">
              <button type="button" onClick={()=> history.push('/login')} className="text-sm text-purple-700">Login Page</button>
            </div>
            <button type="button" className="bg-purple-700 text-white py-1 w-full rounded-md hover:bg-purple-800 flex justify-center items-center" onClick={handleSubmit}>
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
              Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;