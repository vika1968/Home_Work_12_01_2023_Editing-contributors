"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeCtrl_1 = require("./employeeCtrl");
const router = express_1.default.Router();
router
    .get("", employeeCtrl_1.getAllEmmployees)
    .get("/:id", employeeCtrl_1.getEmployeeByID)
    .post("", employeeCtrl_1.addEmployee)
    .delete("/:name", employeeCtrl_1.deleteEmployee)
    .post("/find", employeeCtrl_1.findEmployee)
    .patch("/:id", employeeCtrl_1.updateEmployee);
exports.default = router;
