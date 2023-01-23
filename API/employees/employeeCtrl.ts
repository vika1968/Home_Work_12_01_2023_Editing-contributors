
import { employees } from "./employeeDB";
import express from "express";

//---------Get all employees---------
export function getAllEmmployees(req: express.Request, res: express.Response) {
  try {
    res.send({ success: true, employees });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}

//---------Find employee by ID---------
export function getEmployeeByID(req: express.Request, res: express.Response) {
  try {
    console.log(req.params)
    const { id } = req.params;
    const empl = employees.find(element => element.id === Number(id));

    res.send({ success: true, empl });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}

//---------Add new employee---------
export function addEmployee(req: express.Request, res: express.Response) {
  try {
    const { FirstName, LastName, Age, Address, IDEmployee, Gender } = req.body;
    employees.push({ id: employees.length, FirstName, LastName, Age, Address, IDEmployee, Gender });
    res.send({ success: true, employees });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}

//---------Delete employee by LastName and FirstName---------
export function deleteEmployee(req: express.Request, res: express.Response) {
  try {
    const { name } = req.params;
    const splittedName = name.split(' ');

    const findEmplID = employees.find(element => element.FirstName === splittedName[0].trim() && element.LastName === splittedName[1].trim());

    if (findEmplID == undefined) throw new Error(`No valid employee`);
    const emplArray = employees.filter((element) => element.FirstName !== splittedName[0].trim() && element.LastName === splittedName[1].trim());

    res.send({ success: true, emplArray, findEmplID });

  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}


//---------Find employee by any/some field/s to update information--------
export function findEmployee(req: express.Request, res: express.Response) {
  try {

    const { emplId, firstName, lastName, age, address, IDEmployee, gender } = req.body;
    const elCount = req.body.elCount;
    const empl = employees.filter(element => (emplId !== `` && emplId != null) ? element.id === Number(emplId - 1) : 1 == 1
      && (firstName !== `` && firstName != null) ? element.FirstName === firstName : 1 == 1
        && (lastName !== `` && lastName != null) ? element.LastName === lastName : 1 == 1
          && (age !== `` && age != null) ? element.Age === Number(age) : 1 == 1
            && (address !== `` && address != null) ? element.Address === address : 1 == 1
              && (IDEmployee !== `` && IDEmployee != null) ? element.IDEmployee === Number(IDEmployee) : 1 == 1
                && (gender !== `` && gender != null) ? element.Gender === gender : 1 == 1
    )


    // console.log(empl);
    res.send({ success: true, empl, elCount: empl.length });

  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};


//---------Update employee information--------
export function updateEmployee(req: express.Request, res: express.Response) {
  try {
    let { id } = req.params;
    const { newFirstName, newLastName, newAge, newAddress, newIDEmployee, newGender } = req.body;
    employees.forEach((element) => {
      if (element.id == Number(id)) {
          element.FirstName = (newFirstName !== `` && newFirstName != null) ? newFirstName : element.FirstName,
          element.LastName = (newLastName !== `` && newLastName != null) ? newLastName : element.LastName,
          element.Age = newAge,
          element.Address = newAddress,
          element.IDEmployee = (newIDEmployee !== `` && newIDEmployee != null) ? newIDEmployee : element.IDEmployee,
          element.Gender = (newGender !== `` && newGender != null) ? newGender : element.Gender
      }
    })

    res.send({ success: true, employees });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};