const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');

eventListerners();

function eventListerners() {
  // tum event listenerlar
  form.addEventListener('submit', addTodo);
  document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
  secondCardBody.addEventListener('click', deleteTodo);
  filter.addEventListener('keyup', filterTodos);
  clearButton.addEventListener('click', clearAllTodos);
}

function clearAllTodos(e) {
  if (confirm('tumunu silmek istediginizden emin misiniz?')) {
    // Arayüzden todoları temizleme
    // todoList.innerHTML = ""; bu islem yavas

    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem('todos');
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll('.list-group-item');

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute('style', 'display :none !important');
    } else {
      listItem.setAttribute('style', 'display:block');
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === 'fa fa-remove') {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert('success', 'Todo basarıyla silindi...');
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorages();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); // Arraydan değeri silebiliriz.
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorages();

  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === '') {
    /*
                                                                                           <div class="alert alert-danger" role="alert">
                                                                                            This is a danger alert—check it out!
                                                                                        </div>*/
    showAlert('danger', 'Lütfen bir todo girin...');
  } else {
    addTodoUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert('success', 'Todo başarıyla eklendi');
  }

  e.preventDefault();
}

function getTodosFromStorages() {
  //storageden butun todoları almak
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorages();
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement('div');

  alert.className = `alert alert-${type}`;

  alert.textContent = message;

  firstCardBody.appendChild(alert);
  // setTimeout metodu

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoUI(newTodo) {
  //string degerini list item olarak ekleyecek

  //list item olusturma
  const listItem = document.createElement('li');
  //link olusturma
  const link = document.createElement('a');
  link.href = '#';
  link.className = 'delete-item';
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  listItem.className = 'list-group-item d-flex justify-content-between';

  //text node eklemek

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //todo liste list item eklemek

  todoList.appendChild(listItem);
  todoInput.value = '';
}
