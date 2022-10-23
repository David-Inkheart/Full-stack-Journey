// constructor function

/* function Person(firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.dob = new Date(dob);

}

Person.prototype.getBirthYear = function() {
  return this.dob.getFullYear();
}

Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
} */

// Class 
/* class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
  }

  getBirthYear(){
    return this.dob.getFullYear();
  }

  getFullName(){
    return `${this.firstName} ${this.lastName}`;
  }
}

// instantiate object
const person1 = new Person('John', 'Doe', '4-3-1980');
const person2 = new Person('Mary', 'Smith', '3-6-1970');

console.log(person1.getBirthYear());
console.log(person1.getFullName()); 

console.log(person2.getFullName());
console.log(person1); */



// Single element
//console.log(document.getElementById('my-form'));
//console.log(document.querySelector('h1'));

//Multiple element
//console.log(document.querySelectorAll('.item'))
//console.log(document.getElementsByTagName('li'))



//MANIPULATING THE DOM(document)

//const ul = document.querySelector('.items');

//ul.remove();
//ul.lastElementChild.remove();
//ul.firstElementChild.textContent = 'Hello';
//ul.children[1].innerText = 'David';
//ul.children[1].style.color = 'orange';
//ul.lastElementChild.innerHTML = '<h1>Bye</h1>';

//const btn = document.querySelector('.btn');
//btn.style.background = 'red';

/* const btn = document.querySelector('.btn');


// EVENTS

// Mouse events

btn.addEventListener('click', (e) => {
  e.preventDefault();
  //document.querySelector('#my-form');
  document.querySelector('#my-form').style.background = '#ccc';
  document.querySelector('body').classList.add('bg-dark');
  document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>';
  //console.log(e.target.className);
  alert("Not working yet, I'm just testing!");
}); */


// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

//Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e)
{
  e.preventDefault();

  if(nameInput.value === '' || emailInput.value === '')
  {
    // alert('Please enter all fields');
    msg.innerHTML = 'Please enter all fields'
    msg.classList.add('error')

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } 
  else 
  {
    // Create new list item with user
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));

    // Add HTML
    li.innerHTML = `<strong>${nameInput.value}</strong>: <em>${emailInput.value}</em>`;

    // Append to ul
    userList.appendChild(li);

    //Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}