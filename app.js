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


// 4. 
// Дан массив пользователей, его можно скопировать отсюда из первой задачи, создать таблицу вида:
// Условия:
// В конце таблицы обязательно последняя tr должна содержать total balance всех пользователей из таблицы при этом он должен быть всегда выровнен по правому краю. 
// Количество пользователей может быть любым.
// Таблица и все ее содержимое должно создаваться через js, в разметке у вас может быть только контейнер какой то.
// В коде у вас должна быть переменная которая будет содержать в виде объекта список полей и заголовков th которые будут выводиться в таблице. 
// Что то типа { name: ‘Name’, email: ‘Email’... } соответственно ключ объекта это ваше поле которое вы хотите вывести из объекта пользователя а значение это заголовок th.

// const map = ["_id", "name", "isActive", "balance"];
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

const tableHolder = document.querySelector('.table-holder');
const [{_id, name, email, balance}] = users;
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

let usersInfoTable = '<table class="table"><thead><tr>';
  tableHeadInfoArr.forEach(item => {
    usersInfoTable += `<th>${item}</th>`;
  });
usersInfoTable += '</tr></thead>';

usersInfoTable += '<tbody>';

usersInfoArr.forEach(item => {
  const userInfoArr = Object.values(item);
  
  usersInfoTable += '<tr>';
    userInfoArr.forEach(nestedItem => {
      usersInfoTable += `<td>${nestedItem}</td>`;
    });
  usersInfoTable += '</tr>';
});

usersInfoTable += '</tbody>';
usersInfoTable += '<tfoot><tr>';

usersInfoTable += '</tr></tfoot>';

usersInfoTable += '</table>';



console.log(balance)


tableHolder.innerHTML = usersInfoTable;

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




// 7. 
// Из презентации “Занятие 7 - Манипуляция DOM. Работа с атрибутами.” дополнить функционал для таблицы из задачи 6. Создать кнопку которая будет при клике сортировать пользователей по возрастанию или убыванию поля balance при этом в кнопке должна показываться стрелка в какую сторону сейчас отсортированы пользователи. Иконки можете взять с font awesome, в качестве фреймворка использовался bootstrap.

// tableHolder.insertBefore(sortBtn,usersInfoTable);


});