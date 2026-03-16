const storedData = JSON.parse(localStorage.getItem('userData'));

const userData = storedData || {
  access: null,
  refresh: null,
  user: null,
  firstConnection: false,
};

export default userData;