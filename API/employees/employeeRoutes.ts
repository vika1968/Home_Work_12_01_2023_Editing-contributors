import express from "express";

import { getAllEmmployees, getEmployeeByID, addEmployee, deleteEmployee, findEmployee, updateEmployee} from "./employeeCtrl";

const router = express.Router();

router

.get("", getAllEmmployees)
.get("/:id", getEmployeeByID)
.post("", addEmployee)
.delete("/:name", deleteEmployee)
.post("/find", findEmployee)
.patch("/:id", updateEmployee)

export default router;
