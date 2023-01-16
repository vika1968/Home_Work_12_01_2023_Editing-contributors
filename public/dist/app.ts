console.log("connected")

type Employee = {
    id: number;
    FirstName: string;
    LastName: string;
    Age?: number;
    Address?: string;
    IDEmployee: number;
    Gender: string;
}

const cardList = document.querySelector(`.card_list`) as HTMLDivElement;

//---------Show all employees on load form---------
window.addEventListener("load", async (event) => {
    console.log("All employees are fully loaded");
    await GetAllEmployees();
});

//---------Get all employees---------
const GetAllEmployees = async () => {
    try {
        //@ts-ignore 
        const { data } = await axios.get("/api/employee/list");
        const { success, employees, error } = data;
      
        if (success) {                 
            renderEmployee(employees);
            console.log(employees);
           
        } else {
            throw error;
        }
    } catch (error) {
        console.error(error);
    }
};

const renderEmployee = (employees: Employee[]) => {
    for (let i = 0; i < employees.length; i++) {
        const divCard = document.createElement(`div`) as HTMLDivElement;
        divCard.classList.add(`card`);
        divCard.id = `employee ${(i + 1)}`;
        const img = document.createElement(`img`) as HTMLImageElement;   

        if (employees[i].Gender === `male` || employees[i].Gender === ``) {
            img.src = `https://www.shutterstock.com/image-vector/calmly-surprised-expression-on-face-600w-2192216533.jpg`;
        }
        else {
            img.src = `https://www.shutterstock.com/image-vector/business-woman-raised-her-hands-600w-2194902051.jpg`;
        }

        img.alt = `Avatar`;
        const divContainer = document.createElement(`div`) as HTMLDivElement;
        divContainer.classList.add(`container`);
        const header = document.createElement(`h4`) as HTMLHeadElement;
        const bold = document.createElement(`b`) as HTMLElement;
        bold.innerText = `Employee : ${employees[i].FirstName}  ${employees[i].LastName}`
        const paragraphAge = document.createElement(`p`) as HTMLParagraphElement;
        const paragraphAddress = document.createElement(`p`) as HTMLParagraphElement;
        const paragraphIDEmployee = document.createElement(`p`) as HTMLParagraphElement;
        const paragraphGender = document.createElement(`p`) as HTMLParagraphElement;
        paragraphAge.innerText = `Age : ${employees[i]!.Age}`;
        paragraphAddress.innerText = `Addres : ${employees[i]!.Address}`;
        paragraphIDEmployee.innerText = `ID : ${employees[i]!.IDEmployee}`;
        paragraphGender.innerText = `Gender : ${employees[i]!.Gender}`;

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
}

const appendChildElement = (father: HTMLElement, son: HTMLElement) => {
    father.appendChild(son);
}

//---------Find employee by ID---------
const formHandleEmloyeeByID = document.getElementById(`handleEmloyeeByID`) as HTMLFormElement;
formHandleEmloyeeByID.addEventListener('submit', GetEmployeeByID);

async function GetEmployeeByID(event: any) {
    try {
        event.preventDefault();
        const emplId = document.getElementById(`employeeID`) as HTMLInputElement;
        //@ts-ignore 
        const { data } = await axios.get(`/api/employee/list/${emplId.value - 1}`);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

//---------Add new employee---------
const formAddNewEmployee = document.getElementById(`addNewEmloyee`) as HTMLFormElement;
formAddNewEmployee.addEventListener('submit', AddEmloyee);

async function AddEmloyee(event: any) {
    try {
        event.preventDefault();

        const firstName = document.querySelector(`.firstName`) as HTMLInputElement;
        const firstNameValue = firstName.value;

        const lastName = document.querySelector(`.lastName`) as HTMLInputElement;
        const lastNameValue = lastName.value;

        const age = document.querySelector(`.age`) as HTMLInputElement;
        const ageValue = age.value;

        if (ageValue !== undefined && ageValue != null) {
            if (isNaN(Number(ageValue))) {
                alert(`Please enter a numeric value in the 'age' field!`);
                return;
            }
        }

        const address = document.querySelector(`.address`) as HTMLInputElement;
        const addressValue = address.value;

        const IDEmployee = document.querySelector(`.IDEmployee`) as HTMLInputElement;
        const IDEmployeeValue = IDEmployee.value;

        if (isNaN(Number(IDEmployeeValue))) {
            alert(`Please enter a numeric value in the 'IDEmployee' field!`);
            return;
        }

        const gender = document.querySelector(`.gender`) as HTMLInputElement;
        const genderValue = gender.value;

        //@ts-ignore 
        const { data } = await axios.post("/api/employee/list", { FirstName: firstNameValue, LastName: lastNameValue, Age: ageValue, Address: addressValue, IDEmployee: IDEmployeeValue, Gender: genderValue });
        console.log(data);

        location.reload();
        await GetAllEmployees();

    } catch (error) {
        console.error(error);
    }
}

//---------Delete employee by LastName and FirstName---------
const formDeleteEmployee = document.getElementById(`deleteEmploye`) as HTMLFormElement;
formDeleteEmployee.addEventListener('submit', RemoveEmloyee);

async function RemoveEmloyee(event: any) {
    try {
        event.preventDefault();
        const name = document.getElementById(`empToDelete`) as HTMLInputElement;
        console.log(name);

        let spacePosition = name.value.search(" ");

        if (spacePosition == -1) {
            alert('Please, enter First Name SPACE and Last Name to delete employee ');
            return
        }

        //@ts-ignore 
        const { data } = await axios.delete(`/api/employee/list/${name.value}`);
        removeDiVOfEmployee(`employee ${data.findEmplID.id + 1}`);

    } catch (error) {
        console.error(error);
    }
}

//--------Hide avatar of removed employee---------
const removeDiVOfEmployee = (divID: string) => {
    const divCard = document.getElementById(divID) as HTMLDivElement;
    divCard.style.display = 'none';
}

//---------Update employee information--------
const formUpdateEmployee = document.getElementById(`updateEmloyee`) as HTMLFormElement;
formUpdateEmployee.addEventListener('submit', UpdateEmloyee);

async function UpdateEmloyee(event: any) {
    try {
        event.preventDefault();

        const emplId = document.getElementById(`employeeIDtoUpdate`) as HTMLInputElement;

        const firstName = document.querySelector(`.updFirstName`) as HTMLInputElement;
        const newFirstName = firstName.value;

        const lastName = document.querySelector(`.updLastName`) as HTMLInputElement;
        const newLastName = lastName.value;

        const age = document.querySelector(`.updAge`) as HTMLInputElement;
        const newAge = age.value;

        if (newAge !== undefined && newAge != null) {
            if (isNaN(Number(newAge))) {
                alert(`Please enter a numeric value in the 'age' field!`);
                return;
            }
        }

        const address = document.querySelector(`.updAddress`) as HTMLInputElement;
        const newAddress = address.value;

        const IDEmployee = document.querySelector(`.updIDEmployee`) as HTMLInputElement;
        const newIDEmployee = IDEmployee.value;

        if (isNaN(Number(newIDEmployee))) {
            alert(`Please enter a numeric value in the 'IDEmployee' field!`);
            return;
        }

        const gender = document.querySelector(`.updGender`) as HTMLInputElement;
        const newGender = gender.value;
    
        //@ts-ignore
        const { data } = await axios.patch(`/api/employee/list/${emplId.value - 1}`, { newFirstName, newLastName, newAge, newAddress, newIDEmployee, newGender });
        console.log(data);      
        location.reload();
        await GetAllEmployees();

    } catch (error) {
        console.error(error);
    }
}

