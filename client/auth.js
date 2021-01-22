// Selectors
const loginBtn = document.getElementById('loginbtn');
const signupBtn = document.getElementById('signupbtn');
const username = document.getElementById('username');
const password = document.getElementById('password');

document.querySelector('form').addEventListener('submit', handleSubmit);


//Event Listeners
function handleSubmit(e) {
  console.log('handlesubmit')
  e.preventDefault();
  axios.post('/api/auth/login', { username, password })
    .then(res => console.log('logged in'))
    .catch((err) => console.log(err.message));
}