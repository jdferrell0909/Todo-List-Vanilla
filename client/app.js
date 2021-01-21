const getList = () => {
  axios.get('/api')
    .then(({ data }) => {
      console.log(data);
      data.forEach(item => displayTodo(item.text, item._id));
    })
    .catch(err => console.log(err.message));
}
getList();

// Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', handleClearAll);


// Event Handlers
function handleSubmitForm(e) {
  e.preventDefault();
  let input = document.querySelector('input');
  if(input.value != '') addTodo(input.value);
  input.value = '';
}

function handleClickDeleteOrCheck(e) {
  if(e.target.name == 'checkButton') checkTodo(e);
  if(e.target.name == 'deleteButton') deleteTodo(e);
}

function handleClearAll(e) {
  document.querySelector('ul').innerHTML = '';
  axios.delete('/api/deleteAll')
    .then(res => console.log(res))
    .catch(err => err.message);
}


// Helpers
const addTodo = (todo) => {
  axios.post('/api/addItem', { text: todo })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  displayTodo(todo);
}

const displayTodo = (todo, id) => {
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML = `
    <span class="todo-item">${todo}</span>
    <button name="checkButton"><i class="fas fa-check-square"></i></button>
    <button id=${id} name="deleteButton"><i class="fas fa-trash"></i></button>
  `;
  li.classList.add('todo-list-item');
  ul.appendChild(li);
}

const checkTodo = (e) => {
  let item = e.target.parentNode;
  if(item.style.textDecoration == 'line-through') {
    item.style.textDecoration == 'none';
  } else {
    item.style.textDecoration = 'line-through';
  }
}

const deleteTodo = (e) => {
  let item = e.target.parentNode;
  item.addEventListener('transitioned', () => {
    item.remove();
  })
  item.classList.add('todo-list-item-fall');
  axios.delete(`/api/deleteOne/${e.target.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.message));
}