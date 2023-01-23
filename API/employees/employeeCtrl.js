"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.findEmployee = exports.deleteEmployee = exports.addEmployee = exports.getEmployeeByID = exports.getAllEmmployees = void 0;
const employeeDB_1 = require("./employeeDB");
//---------Get all employees---------
function getAllEmmployees(req, res) {
    try {
        res.send({ success: true, employees: employeeDB_1.employees });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
}
exports.getAllEmmployees = getAllEmmployees;
//---------Find employee by ID---------
function getEmployeeByID(req, res) {
    try {
        console.log(req.params);
        const { id } = req.params;
        const empl = employeeDB_1.employees.find(element => element.id === Number(id));
        res.send({ success: true, empl });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
}
exports.getEmployeeByID = getEmployeeByID;
//---------Add new employee---------
function addEmployee(req, res) {
    try {
        const { FirstName, LastName, Age, Address, IDEmployee, Gender } = req.body;
        employeeDB_1.employees.push({ id: employeeDB_1.employees.length, FirstName, LastName, Age, Address, IDEmployee, Gender });
        res.send({ success: true, employees: employeeDB_1.employees });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
}
exports.addEmployee = addEmployee;
//---------Delete employee by LastName and FirstName---------
function deleteEmployee(req, res) {
    try {
        const { name } = req.params;
        const splittedName = name.split(' ');
        const findEmplID = employeeDB_1.employees.find(element => element.FirstName === splittedName[0].trim() && element.LastName === splittedName[1].trim());
        if (findEmplID == undefined)
            throw new Error(`No valid employee`);
        const emplArray = employeeDB_1.employees.filter((element) => element.FirstName !== splittedName[0].trim() && element.LastName === splittedName[1].trim());
        res.send({ success: true, emplArray, findEmplID });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
}
exports.deleteEmployee = deleteEmployee;
//---------Find employee by any/some field/s to update information--------
function findEmployee(req, res) {
    try {
        const { emplId, firstName, lastName, age, address, IDEmployee, gender } = req.body;
        const elCount = req.body.elCount;
        const empl = employeeDB_1.employees.filter(element => (emplId !== `` && emplId != null) ? element.id === Number(emplId - 1) : 1 == 1
            && (firstName !== `` && firstName != null) ? element.FirstName === firstName : 1 == 1
            && (lastName !== `` && lastName != null) ? element.LastName === lastName : 1 == 1
            && (age !== `` && age != null) ? element.Age === Number(age) : 1 == 1
            && (address !== `` && address != null) ? element.Address === address : 1 == 1
            && (IDEmployee !== `` && IDEmployee != null) ? element.IDEmployee === Number(IDEmployee) : 1 == 1
            && (gender !== `` && gender != null) ? element.Gender === gender : 1 == 1);
        // console.log(empl);
        res.send({ success: true, empl, elCount: empl.length });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
}
exports.findEmployee = findEmployee;
;
//---------Update employee information--------
function updateEmployee(req, res) {
    try {
        let { id } = req.params;
        const { newFirstName, newLastName, newAge, newAddress, newIDEmployee, newGender } = req.body;
        employeeDB_1.employees.forEach((element) => {
            if (element.id == Number(id)) {
                element.FirstName = (newFirstName !== `` && newFirstName != null) ? newFirstName : element.FirstName,
                    element.LastName = (newLastName !== `` && newLastName != null) ? newLastName : element.LastName,
                    element.Age = newAge,
                    element.Address = newAddress,
                    element.IDEmployee = (newIDEmployee !== `` && newIDEmployee != null) ? newIDEmployee : element.IDEmployee,
                    element.Gender = (newGender !== `` && newGender != null) ? newGender : element.Gender;
            }
        });
        res.send({ success: true, employees: employeeDB_1.employees });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
}
exports.updateEmployee = updateEmployee;
;
