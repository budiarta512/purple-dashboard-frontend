import api from "../utils/api"


export const postData = (path, data)=> {
  return api().post(path, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log(error)
      return error
    })
}