export default {
  setUser: userName => window.localStorage.setItem('user_id', userName),
  getUser: () => window.localStorage.getItem('user_id')
}
