let users = [];
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let ageInput = document.getElementById("age");
let emailInput = document.getElementById("email");
let userList = document.getElementById("userList");
let errorMessages = document.getElementsByClassName("error");
let firstNameSearch = document.getElementById("searchInputFirstName");
let lastNameSearch = document.getElementById("searchInputLastName");
let ageSearch = document.getElementById("searchInputAge");
let emailSearch = document.getElementById("searchInputEmail");
let userListSection = document.getElementById("userListSection");
let registerForm = document.getElementById("wrapper");

function addUser() {
    let firstName = firstNameInput.value.trim();
    let lastName = lastNameInput.value.trim();
    let age = ageInput.value.trim();
    let email = emailInput.value.trim();

    if (onErrorUser(firstName, lastName, age, email)) {
        return;
    }

    let user = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email
    };

    users.push(user);
    createTable(users);

    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
}

function deleteUser(index) {
    users.splice(index, 1);
    createTable(users);
}

function editUser() {

}

function saveEditUser() {
    
}
  
function onErrorUser(firstName, lastName, age, email) {
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = "";
    }

    let hasError = false;

    if (firstName === "") {
        displayErrorMessage("firstName", "Please enter first name");
        hasError = true;
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
        displayErrorMessage("firstName", "Please enter only letters");
        hasError = true;
    }

    if (lastName === "") {
        displayErrorMessage("lastName", "Please enter last name");
        hasError = true;
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
        displayErrorMessage("lastName", "Please enter only letters");
        hasError = true;
    }

    if (age === "") {
        displayErrorMessage("age", "Please enter age");
        hasError = true;
    } else if (!/^\d+$/.test(age)) {
        displayErrorMessage("age", "Please enter a valid age");
        hasError = true;
    } else if (parseInt(age) > 100) {
        displayErrorMessage("age", "Age must be less than or equal to 100");
        hasError = true;
    }

    if (email === "") {
        displayErrorMessage("email", "Please enter email");
        hasError = true;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        displayErrorMessage("email", "Please enter a valid email");
        hasError = true;
    }

    if (users.find(user => user.email === email)) {
        displayErrorMessage("email", "Email already exists");
        hasError = true;
    }

    return hasError;
}

function displayErrorMessage(fieldId, message) {
    let errorElement = document.getElementById(fieldId + "Error");
    errorElement.textContent = message;
}

function createTable(array) {
    let userList = document.getElementById('userList');
    userList.innerHTML = '';

    if (Array.isArray(array)) {
        array.map((user, index) => {
            return (userList.innerHTML += `<div class="right-main-items">
                <p class="for-position-id">${index + 1}</p>
                <p>${user.firstName}</p>
                <p>${user.lastName}</p>
                <p>${user.age}</p>
                <p>${user.email}</p>
                <button class="delete" onclick="deleteUser(${index})">Delete</button>
                <button class="edit" onclick="editUser(${index})">Edit</button>
            </div>`);
        });
    }
}

function onCancel() {
    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";  
}

function searchUsers() {
    let searchTermName = firstNameSearch.value.trim().toLowerCase();
    let searchTermLastName = lastNameSearch.value.trim().toLowerCase();
    let searchTermAge = ageSearch.value.trim().toLowerCase();
    userList.innerHTML = '';

    if (searchTermName || searchTermLastName || searchTermAge) {
        filteredUsers = users.filter(user => {
            let name = user.firstName.toLowerCase().includes(searchTermName);
            let lastName = user.lastName.toLowerCase().includes(searchTermLastName);
            let age = user.age.toString().includes(searchTermAge);
            return name && lastName && age;
        });

        if (filteredUsers.length > 0) {
            createTable(filteredUsers);;
        }
    } else {
        createTable(users);
    }
}

function toggleUserList() {
    if (userListSection.style.display === "none") {
        userListSection.style.display = "block";
        registerForm.style.display = "none";
    } else {
        userListSection.style.display = "none";
        registerForm.style.display = "block";
    }
}

function redirectToRegistration() {
    userListSection.style.display = "none";
    registerForm.style.display = "block";
}
console.log(users)