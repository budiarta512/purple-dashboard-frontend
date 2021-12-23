
const login = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
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