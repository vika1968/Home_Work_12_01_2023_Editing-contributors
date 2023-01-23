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
let empCount;
//---------Show all employees on load form---------
window.addEventListener("load", (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("All employees are fully loaded");
    yield handleGetAllEmployees();
}));
//---------Get all employees---------
const handleGetAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore 
        const { data } = yield axios.get("/api/employee/list");
        const { success, employees, error } = data;
        if (success) {
            handleRenderEmployee(employees);
            //console.log(employees);
            empCount = employees.length;
        }
        else {
            throw error;
        }
    }
    catch (error) {
        console.error(error);
    }
});
const handleRenderEmployee = (employees) => {
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
        handleAppendChildElement(divCard, img);
        handleAppendChildElement(header, bold);
        handleAppendChildElement(divContainer, header);
        handleAppendChildElement(divContainer, paragraphAge);
        handleAppendChildElement(divContainer, paragraphAddress);
        handleAppendChildElement(divContainer, paragraphIDEmployee);
        handleAppendChildElement(divContainer, paragraphGender);
        handleAppendChildElement(divCard, divContainer);
        handleAppendChildElement(cardList, divCard);
    }
};
//---------Find employee by ID---------
const formHandleEmloyeeByID = document.getElementById(`handleEmloyeeByID`);
formHandleEmloyeeByID.addEventListener('submit', handleGetEmployeeByID);
function handleGetEmployeeByID(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const id = event.target.elements.employeeID.value;
            //@ts-ignore 
            const { data } = yield axios.get(`/api/employee/list/${id - 1}`);
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---------Add new employee---------
const formAddNewEmployee = document.getElementById(`addNewEmloyee`);
formAddNewEmployee.addEventListener('submit', handleAddEmloyee);
function handleAddEmloyee(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const firstNameValue = handleSelectInputElement(`.firstName`).value;
            const lastNameValue = handleSelectInputElement(`.lastName`).value;
            const ageValue = handleSelectInputElement(`.age`).value;
            if (ageValue !== undefined && ageValue != null) {
                if (isNaN(Number(ageValue))) {
                    alert(`Please enter a numeric value in the 'age' field!`);
                    return;
                }
            }
            const addressValue = handleSelectInputElement(`.address`).value;
            const IDEmployeeValue = handleSelectInputElement(`.IDEmployee`).value;
            if (isNaN(Number(IDEmployeeValue))) {
                alert(`Please enter a numeric value in the 'IDEmployee' field!`);
                return;
            }
            const genderValue = handleSelectInputElement(`.gender`).value;
            //@ts-ignore 
            const { data } = yield axios.post("/api/employee/list", { FirstName: firstNameValue, LastName: lastNameValue, Age: ageValue, Address: addressValue, IDEmployee: IDEmployeeValue, Gender: genderValue });
            // console.log(data);
            location.reload();
            yield handleGetAllEmployees();
            empCount = empCount + 1;
            updateEmployeeIDMaxNumber(empCount);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---------Delete employee by LastName and FirstName---------
const formDeleteEmployee = document.getElementById(`deleteEmploye`);
formDeleteEmployee.addEventListener('submit', handleRemoveEmloyee);
function handleRemoveEmloyee(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const name = document.getElementById(`empToDelete`);
            let spacePosition = name.value.search(" ");
            if (spacePosition == -1) {
                alert('Please, enter First Name SPACE and Last Name to delete employee ');
                return;
            }
            //@ts-ignore 
            const { data } = yield axios.delete(`/api/employee/list/${name.value.trim()}`);
            handleRemoveDiVOfEmployee(`employee ${data.findEmplID.id + 1}`);
            handleRefreshFields();
            empCount = empCount - 1;
            updateEmployeeIDMaxNumber(empCount);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---------Find employee by any/some field/s to update information--------
const findEmplToUpdate = document.querySelector(`.findEmplToUpdate`);
findEmplToUpdate.addEventListener('click', handleFindEmployeeByAnyField);
function handleFindEmployeeByAnyField(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const emplId = handleSelectInputElement(`.emplIDtoUpdate`).value;
            const firstName = handleSelectInputElement(`.updFirstName`).value;
            const lastName = handleSelectInputElement(`.updLastName`).value;
            const age = handleSelectInputElement(`.updAge`).value;
            const address = handleSelectInputElement(`.updAddress`).value;
            const IDEmployee = handleSelectInputElement(`.updIDEmployee`).value;
            const gender = handleSelectInputElement(`.updGender`).value;
            if (emplId == `` && firstName == `` && lastName == `` && age == `` && address == `` && IDEmployee == `` && gender == ``) {
                alert(`Please, fill in some search fields!`);
                return;
            }
            let elCount;
            //@ts-ignore      
            const { data } = yield axios.post(`/api/employee/list/find`, { emplId, firstName, lastName, age, address, IDEmployee, gender }, elCount);
            if (data.elCount == 0) {
                alert(`No employee found!`);
            }
            else if (data.elCount == 1) {
                alert(`1 employee found!`);
                handleShowSingleEmplyee(data.empl);
            }
            else {
                // console.log(data.empl);
                alert(`Therte are ${data.elCount} employees found!`);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
//-----------------Fill the fields --------------------------------------------
const handleShowSingleEmplyee = (empl) => {
    handleSelectInputElement(`.emplIDtoUpdate`).value = (empl[0].id + 1).toString();
    handleSelectInputElement(`.updFirstName`).value = empl[0].FirstName;
    handleSelectInputElement(`.updLastName`).value = empl[0].LastName;
    handleSelectInputElement(`.updAge`).value = empl[0].Age.toString();
    handleSelectInputElement(`.updAddress`).value = empl[0].Address;
    handleSelectInputElement(`.updIDEmployee`).value = empl[0].IDEmployee.toString();
    handleSelectInputElement(`.updGender`).value = empl[0].Gender;
};
//---------Update employee information--------
const formUpdateEmployee = document.getElementById(`updateEmloyee`);
formUpdateEmployee.addEventListener('submit', handleUpdateEmloyee);
function handleUpdateEmloyee(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const id = handleSelectInputElement(`.emplIDtoUpdate`);
            const newFirstName = handleSelectInputElement(`.updFirstName`).value;
            const newLastName = handleSelectInputElement(`.updLastName`).value;
            const newAge = handleSelectInputElement(`.updAge`).value;
            if (newAge !== undefined && newAge != null) {
                if (isNaN(Number(newAge))) {
                    alert(`Please enter a numeric value in the 'age' field!`);
                    return;
                }
            }
            const newAddress = handleSelectInputElement(`.updAddress`).value;
            const newIDEmployee = handleSelectInputElement(`.updIDEmployee`).value;
            if (isNaN(Number(newIDEmployee))) {
                alert(`Please enter a numeric value in the 'IDEmployee' field!`);
                return;
            }
            const newGender = handleSelectInputElement(`.updGender`).value;
            //@ts-ignore
            const { data } = yield axios.patch(`/api/employee/list/${id.value - 1}`, { newFirstName, newLastName, newAge, newAddress, newIDEmployee, newGender });
            location.reload();
            yield handleGetAllEmployees();
        }
        catch (error) {
            console.error(error);
        }
    });
}
//-----------Secondary functions-----------------
const handleAppendChildElement = (father, son) => {
    father.appendChild(son);
};
const handleSelectInputElement = (className) => {
    return document.querySelector(className);
};
//--------Hide avatar of removed employee---------
const handleRemoveDiVOfEmployee = (divID) => {
    const divCard = document.getElementById(divID);
    divCard.style.display = 'none';
};
//---------Clean Fields------------------------
const handleRefreshFields = () => {
    // ----first form------
    handleSelectInputElement(`.firstName`).value = ``;
    handleSelectInputElement(`.lastName`).value = ``;
    handleSelectInputElement(`.age`).value = ``;
    handleSelectInputElement(`.address`).value = ``;
    handleSelectInputElement(`.IDEmployee`).value = ``;
    handleSelectInputElement(`.gender`).value = ``;
    //----Second form-----
    handleSelectInputElement(`.emplIDtoUpdate`).value = ``;
    handleSelectInputElement(`.updFirstName`).value = ``;
    handleSelectInputElement(`.updLastName`).value = ``;
    handleSelectInputElement(`.updAge`).value = ``;
    handleSelectInputElement(`.updAddress`).value = ``;
    handleSelectInputElement(`.updIDEmployee`).value = ``;
    handleSelectInputElement(`.updGender`).value = ``;
};
//--------------update employeeID max number------------------------
const updateEmployeeIDMaxNumber = (employeesCount) => {
    const inputEmplID1 = document.getElementById(`employeeID`);
    const inputEmplID2 = document.getElementById(`employeeIDtoUpdate`);
    inputEmplID1.max = `${employeesCount.toString()}`;
    inputEmplID2.max = `${employeesCount.toString()}`;
    inputEmplID1.placeholder = `Enter the id number from 1 to ${employeesCount.toString()}`;
    inputEmplID2.placeholder = `Enter the id number from 1 to ${employeesCount.toString()}`;
};
//---------Reload Window--------------
const btncleanFields = document.querySelector(`.cleanFields`);
const handleReloadWindow = (event) => {
    event.preventDefault();
    location.reload();
};
btncleanFields.addEventListener('click', handleReloadWindow);
