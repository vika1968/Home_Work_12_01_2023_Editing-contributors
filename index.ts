console.log("Hone Work 12_01_2023")

import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static('public'));

import employeeRoutes from "./API/employees/employeeRoutes";

app.use("/api/employee/list", employeeRoutes);

app.listen(PORT, () => {
  console.log(`server is active on port : ${PORT}`);
})


