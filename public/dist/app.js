"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("connected");
const cardList = document.querySelector(`.card_list`);
//---------Show all employees on load form---------
window.addEventListener("load", (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("All employees are fully loaded");
    yield GetAllEmployees();
}));
//---------Get all employees---------
const GetAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore 
        const { data } = yield axios.get("/api/employee/list");
        const { success, employees, error } = data;
        if (success) {
            renderEmployee(employees);
            console.log(employees);
        }
        else {
            throw error;
        }
    }
    catch (error) {
        console.error(error);
    }
});
const renderEmployee = (employees) => {
    for (let i = 0; i < employees.length; i++) {
        const divCard = document.createElement(`div`);
        divCard.classList.add(`card`);
        divCard.id = `employee ${(i + 1)}`;
        const img = document.createElement(`img`);
        if (employees[i].Gender === `male` || employees[i].Gender === ``) {
            img.src = `https://www.shutterstock.com/image-vector/calmly-surprised-expression-on-face-600w-2192216533.jpg`;
        }
        else {
            img.src = `https://www.shutterstock.com/image-vector/business-woman-raised-her-hands-600w-2194902051.jpg`;
        }
        img.alt = `Avatar`;
        const divContainer = document.createElement(`div`);
        divContainer.classList.add(`container`);
        const header = document.createElement(`h4`);
        const bold = document.createElement(`b`);
        bold.innerText = `Employee : ${employees[i].FirstName}  ${employees[i].LastName}`;
        const paragraphAge = document.createElement(`p`);
        const paragraphAddress = document.createElement(`p`);
        const paragraphIDEmployee = document.createElement(`p`);
        const paragraphGender = document.createElement(`p`);
        paragraphAge.innerText = `Age : ${employees[i].Age}`;
        paragraphAddress.innerText = `Addres : ${employees[i].Address}`;
        paragraphIDEmployee.innerText = `ID : ${employees[i].IDEmployee}`;
        paragraphGender.innerText = `Gender : ${employees[i].Gender}`;
        appendChildElement(divCard, img);
        appendChildElement(header, bold);
        appendChildElement(divContainer, header);
        appendChildElement(divContainer, paragraphAge);
        appendChildElement(divContainer, paragraphAddress);
        appendChildElement(divContainer, paragraphIDEmployee);
        appendChildElement(divContainer, paragraphGender);
        appendChildElement(divCard, divContainer);
        appendChildElement(cardList, divCard);
    }
};
const appendChildElement = (father, son) => {
    father.appendChild(son);
};
//---------Find employee by ID---------
const formHandleEmloyeeByID = document.getElementById(`handleEmloyeeByID`);
formHandleEmloyeeByID.addEventListener('submit', GetEmployeeByID);
function GetEmployeeByID(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const emplId = document.getElementById(`employeeID`);
            //@ts-ignore 
            const { data } = yield axios.get(`/api/employee/list/${emplId.value - 1}`);
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---------Add new employee---------
const formAddNewEmployee = document.getElementById(`addNewEmloyee`);
formAddNewEmployee.addEventListener('submit', AddEmloyee);
function AddEmloyee(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const firstName = document.querySelector(`.firstName`);
            const firstNameValue = firstName.value;
            const lastName = document.querySelector(`.lastName`);
            const lastNameValue = lastName.value;
            const age = document.querySelector(`.age`);
            const ageValue = age.value;
            if (ageValue !== undefined && ageValue != null) {
                if (isNaN(Number(ageValue))) {
                    alert(`Please enter a numeric value in the 'age' field!`);
                    return;
                }
            }
            const address = document.querySelector(`.address`);
            const addressValue = address.value;
            const IDEmployee = document.querySelector(`.IDEmployee`);
            const IDEmployeeValue = IDEmployee.value;
            if (isNaN(Number(IDEmployeeValue))) {
                alert(`Please enter a numeric value in the 'IDEmployee' field!`);
                return;
            }
            const gender = document.querySelector(`.gender`);
            const genderValue = gender.value;
            //@ts-ignore 
            const { data } = yield axios.post("/api/employee/list", { FirstName: firstNameValue, LastName: lastNameValue, Age: ageValue, Address: addressValue, IDEmployee: IDEmployeeValue, Gender: genderValue });
            console.log(data);
            location.reload();
            yield GetAllEmployees();
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---------Delete employee by LastName and FirstName---------
const formDeleteEmployee = document.getElementById(`deleteEmploye`);
formDeleteEmployee.addEventListener('submit', RemoveEmloyee);
function RemoveEmloyee(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const name = document.getElementById(`empToDelete`);
            console.log(name);
            let spacePosition = name.value.search(" ");
            if (spacePosition == -1) {
                alert('Please, enter First Name SPACE and Last Name to delete employee ');
                return;
            }
            //@ts-ignore 
            const { data } = yield axios.delete(`/api/employee/list/${name.value}`);
            removeDiVOfEmployee(`employee ${data.findEmplID.id + 1}`);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//--------Hide avatar of removed employee---------
const removeDiVOfEmployee = (divID) => {
    const divCard = document.getElementById(divID);
    divCard.style.display = 'none';
};
//---------Update employee information--------
const formUpdateEmployee = document.getElementById(`updateEmloyee`);
formUpdateEmployee.addEventListener('submit', UpdateEmloyee);
function UpdateEmloyee(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const emplId = document.getElementById(`employeeIDtoUpdate`);
            const firstName = document.querySelector(`.updFirstName`);
            const newFirstName = firstName.value;
            const lastName = document.querySelector(`.updLastName`);
            const newLastName = lastName.value;
            const age = document.querySelector(`.updAge`);
            const newAge = age.value;
            if (newAge !== undefined && newAge != null) {
                if (isNaN(Number(newAge))) {
                    alert(`Please enter a numeric value in the 'age' field!`);
                    return;
                }
            }
            const address = document.querySelector(`.updAddress`);
            const newAddress = address.value;
            const IDEmployee = document.querySelector(`.updIDEmployee`);
            const newIDEmployee = IDEmployee.value;
            if (isNaN(Number(newIDEmployee))) {
                alert(`Please enter a numeric value in the 'IDEmployee' field!`);
                return;
            }
            const gender = document.querySelector(`.updGender`);
            const newGender = gender.value;
            //@ts-ignore
            const { data } = yield axios.patch(`/api/employee/list/${emplId.value - 1}`, { newFirstName, newLastName, newAge, newAddress, newIDEmployee, newGender });
            console.log(data);
            location.reload();
            yield GetAllEmployees();
        }
        catch (error) {
            console.error(error);
        }
    });
}
