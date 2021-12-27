
const login = (token) => {
  localStorage.setItem('token', token);
}
const logout = () => {
  localStorage.clear();
}

const isLogin = () => {
  const token = localStorage.getItem('token');
  if(token) {
    return true;
  } else {
    return false;
  }
}

export {login, isLogin, logout};