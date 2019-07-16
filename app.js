document.addEventListener('DOMContentLoaded', function(){
// 1. 
// Создать функцию, которая принимает два элемента. Функция проверяет, является ли первый элемент родителем для второго:

// isParent(parent, child);
// isParent(document.body.children[0], document.querySelector('mark'));
//  true так как первый див является родительским элементом для mark

// isParent(document.querySelector('ul'), document.querySelector('mark'));
// false так ul НЕ является родительским элементом для mark
// Функция принимает только DOM объекты.

function isParent(parent, child) {
    if(parent.contains(child)) {
        return true;
    } else {
        return false;
    }
}

isParent(document.body.children[0], document.querySelector('mark'));
isParent(document.querySelector('ul'), document.querySelector('mark'));


// 2. 
// Получить список всех ссылок, которые не находятся внутри списка ul

const linksArr = Array.from(document.getElementsByTagName('a')).filter( item => !item.closest('ul'));


// 3. 
// Найти элемент, который находится перед и после списка ul

const prevSibling = document.querySelector('ul').previousSibling;
const nextSibling = document.querySelector('ul').nextSibling;


// 5.
// По нажатию на кнопку "btn-msg" должен появиться алерт с тем текстом который находится в атрибуте data-text у кнопки.

let msgBtn = document.querySelector('#btn-msg');

msgBtn.addEventListener('click', showBtnText);

function showBtnText(e) {
    e.preventDefault();
    alert(this.innerHTML);
}


// 6. 
// При нажатии на любой узел документа показать в элементе с id=tag имя тега нажатого элемента.

const allElements = Array.from(document.getElementsByTagName('*'));
const showTagElement = document.getElementById('tag');
let tagName = document.createElement('span');

showTagElement.appendChild(tagName);

for (let i = 0; i < allElements.length; i++) {
    allElements[i].addEventListener('click', showTagName);
}

function showTagName(e) {
    e.preventDefault();
    e.stopPropagation();
    tagName.innerHTML = ' ' + e.target.tagName;
}


// 4. 
// Дан массив пользователей, его можно скопировать отсюда из первой задачи, создать таблицу вида:
// Условия:
// В конце таблицы обязательно последняя tr должна содержать total balance всех пользователей из таблицы при этом он должен быть всегда выровнен по правому краю. 
// Количество пользователей может быть любым.
// Таблица и все ее содержимое должно создаваться через js, в разметке у вас может быть только контейнер какой то.
// В коде у вас должна быть переменная которая будет содержать в виде объекта список полей и заголовков th которые будут выводиться в таблице. 
// Что то типа { name: ‘Name’, email: ‘Email’... } соответственно ключ объекта это ваше поле которое вы хотите вывести из объекта пользователя а значение это заголовок th.

const users = [
  {
    "_id": "5d220b10e8265cc978e2586b",
    "isActive": true,
    "balance": 2853.33,
    "age": 20,
    "name": "Buckner Osborne",
    "gender": "male",
    "company": "EMPIRICA",
    "email": "bucknerosborne@empirica.com",
    "phone": "+1 (850) 411-2997",
    "registered": "2018-08-13T04:28:45 -03:00",
    "nestedField": { total: 300 }
  },
  {
    "_id": "5d220b10144ef972f6c2b332",
    "isActive": true,
    "balance": 1464.63,
    "age": 38,
    "name": "Rosalie Smith",
    "gender": "female",
    "company": "KATAKANA",
    "email": "rosaliesmith@katakana.com",
    "phone": "+1 (943) 463-2496",
    "registered": "2016-12-09T05:15:34 -02:00",
    "nestedField": { total: 400 }
  },
  {
    "_id": "5d220b1083a0494655cdecf6",
    "isActive": false,
    "balance": 2823.39,
    "age": 40,
    "name": "Estrada Davenport",
    "gender": "male",
    "company": "EBIDCO",
    "email": "estradadavenport@ebidco.com",
    "phone": "+1 (890) 461-2088",
    "registered": "2016-03-04T03:36:38 -02:00",
    "nestedField": { total: 200 }
  }
];

(function(arrOfUsers) {
  // UI elements
  const tableHolder = document.querySelector('.table-holder');
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');
  const tableFoot = document.createElement('tfoot');

  //UI set styles
  table.classList.add('table');
  
  const tableHeadInfo = {
    id: '#',
    name: 'Name',
    email: 'Email',
    balance: 'Balance'
  }
  const tableHeadInfoArr = Object.values(tableHeadInfo);
  const usersInfoArr = users.map(function(item) {
    return {
      id: item._id,
      name: item.name,
      email: item.email,
      balance: item.balance
    }
  });
  const [{balance}] = usersInfoArr;

  createTable();

  function createTable() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(table);
    createTableHead();
    createTableBody(usersInfoArr);
    createTableFoot();
    tableHolder.appendChild(fragment);
  }

  function createTableHead() {
    
    const tr = document.createElement('tr');

    tableHead.appendChild(tr);

    tableHeadInfoArr.forEach(cell => {
      const th = document.createElement('th');
      th.textContent = `${cell}`;
      tr.appendChild(th);
    });

    table.appendChild(tableHead);
  }

  function createTableBody(arr) {
    arr.forEach(item => {
      const userInfoArr = Object.values(item);
      const tr = document.createElement('tr');
      
      tableBody.appendChild(tr);

      userInfoArr.forEach(nestedItem => {
        const td = document.createElement('td');
        td.textContent = `${nestedItem}`;
        tr.appendChild(td);
      });
    });

    table.appendChild(tableBody);
  }
  
  function createTableFoot() {
    const tr = document.createElement('tr');
    const span = document.createElement('span');
    const strong = document.createElement('strong');
    const td = document.createElement('td');
    let totalValue = strong.textContent = calcTotal();
    
    tableFoot.appendChild(tr);
    
    td.setAttribute('colspan', '4');
    td.style.textAlign = 'right';
    span.textContent = 'Total balance: ';
    td.appendChild(span);
    strong.textContent = calcTotal();
    td.appendChild(strong);
    
    tr.appendChild(td);
    table.appendChild(tableFoot);
  }
  
  function calcTotal() {
    let totalValue = users.reduce((acc, item) => acc += item.balance, 1);
    
    return totalValue;
  }
  
  // 7. 
  // Из презентации “Занятие 7 - Манипуляция DOM. 
  // Работа с атрибутами.” дополнить функционал для таблицы из задачи 6. 
  // Создать кнопку которая будет при клике сортировать пользователей по возрастанию или убыванию поля balance 
  // при этом в кнопке должна показываться стрелка в какую сторону сейчас отсортированы пользователи. 
  // Иконки можете взять с font awesome, в качестве фреймворка использовался bootstrap.

  let sortBtn = document.createElement('a');
  let btnText = document.createElement('span');
  let btnArrow = document.createElement('span');
  
  sortBtn.classList.add('btn', 'btn-primary');
  
  btnText.textContent = 'Sort ';
  sortBtn.appendChild(btnText);
  
  btnArrow.classList.add('glyphicon', 'glyphicon-arrow-up');
  sortBtn.appendChild(btnArrow);
  
  tableHolder.insertAdjacentElement('afterbegin', sortBtn);
  

  let sortedusersArr = [];
  
  sortBtn.addEventListener('click', sortBalance);
  
  function sortBalance() {
    sortBtn.classList.toggle('min-to-max');
    
    if(sortBtn.classList.contains('min-to-max')) {
      sortedusersArr = usersInfoArr.sort((item1, item2) => (item1.balance - item2.balance));
    } else {
      sortedusersArr = usersInfoArr.sort((item1, item2) => (item2.balance - item1.balance));
    }
    
    // console.log(sortedusersArr)
    // return sortedusersArr;
    
    createTableBody(sortedusersArr);
  }

})(users);





});