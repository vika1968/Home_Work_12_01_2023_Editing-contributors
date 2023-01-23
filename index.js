"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hone Work 12_01_2023");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 4000;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
const employeeRoutes_1 = __importDefault(require("./API/employees/employeeRoutes"));
app.use("/api/employee/list", employeeRoutes_1.default);
app.listen(PORT, () => {
    console.log(`server is active on port : ${PORT}`);
});
