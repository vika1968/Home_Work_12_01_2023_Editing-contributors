"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hone Work 12_01_2023");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
const employees = [
    {
        id: 0,
        FirstName: "Stella",
        LastName: "Reed",
        Age: 37,
        Address: "Byalik str, Apt. 26, Holon",
        IDEmployee: 47658955,
        Gender: "female"
    },
    {
        id: 1,
        FirstName: "Ran",
        LastName: "Shwizer",
        Age: 42,
        Address: "Shenkar str, Apt. 33, Bat Yam",
        IDEmployee: 45581366,
        Gender: "male"
    },
    {
        id: 2,
        FirstName: "Kim",
        LastName: "Besinger",
        Age: 55,
        Address: "Golan str, Apt. 66, Tel-Aviv",
        IDEmployee: 66456962,
        Gender: "female"
    },
    {
        id: 3,
        FirstName: "Shnulik",
        LastName: "Pesker",
        Age: 39,
        Address: "Sokolov str, Apt. 45, Ramat Gan",
        IDEmployee: 45581366,
        Gender: "male"
    },
    {
        id: 4,
        FirstName: "Tali",
        LastName: "Mozes",
        Age: 61,
        Address: "Arlozorov str, Apt. 4, Raanana",
        IDEmployee: 66456962,
        Gender: "female"
    },
    {
        id: 5,
        FirstName: "Sharon",
        LastName: "Amitzur",
        Age: 48,
        Address: "Hankin str, Apt. 88, Rishon Lezion",
        IDEmployee: 45581366,
        Gender: "male"
    }
];
//---------Get all employees---------
app.get("/api/employee/list", (req, res) => {
    try {
        res.send({ success: true, employees });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
});
//---------Find employee by ID---------
app.get("/api/employee/list/:id", (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const empl = employees.find(element => element.id === Number(id));
        res.send({ success: true, empl });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
});
//---------Add new employee---------
app.post("/api/employee/list", (req, res) => {
    try {
        const { FirstName, LastName, Age, Address, IDEmployee, Gender } = req.body;
        employees.push({ id: employees.length, FirstName, LastName, Age, Address, IDEmployee, Gender });
        res.send({ success: true, employees });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
});
//---------Delete employee by LastName and FirstName---------
app.delete("/api/employee/list/:name", (req, res) => {
    try {
        const { name } = req.params;
        const splittedName = name.split(' ');
        const findEmplID = employees.find(element => element.FirstName === splittedName[0] && element.LastName === splittedName[1]);
        if (findEmplID == undefined)
            throw new Error(`No valid employee`);
        const emplArray = employees.filter((element) => element.FirstName !== splittedName[0] && element.LastName === splittedName[1]);
        res.send({ success: true, emplArray, findEmplID });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
});
//---------Update employee information--------
app.patch("/api/employee/list/:id", (req, res) => {
    try {
        let { id } = req.params;
        const { newFirstName, newLastName, newAge, newAddress, newIDEmployee, newGender } = req.body;
        employees.forEach((element) => {
            if (element.id == Number(id)) {
                element.FirstName = (newFirstName !== `` && newFirstName != null) ? newFirstName : element.FirstName,
                    element.LastName = (newLastName !== `` && newLastName != null) ? newLastName : element.LastName,
                    element.Age = (newAge !== `` && newAge != null) ? newAge : element.Age,
                    element.Address = (newAddress !== `` && newAddress != null) ? newAddress : element.Address,
                    element.IDEmployee = (newIDEmployee !== `` && newIDEmployee != null) ? newIDEmployee : element.IDEmployee,
                    element.Gender = (newGender !== `` && newGender != null) ? newGender : element.Gender;
            }
        });
        res.send({ success: true, employees });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
});
app.listen(PORT, () => {
    console.log(`server is active on port : ${PORT}`);
});
