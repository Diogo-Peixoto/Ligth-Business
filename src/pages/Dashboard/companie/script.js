import { DashboardAdmin, handleDarkMode, logout } from "../script.js";

handleDarkMode()
logout()

DashboardAdmin.verificationAdmin()

DashboardAdmin.companies()
document.getElementById("form_companies")[4].addEventListener("click",(e)=>{
    e.preventDefault()
    DashboardAdmin.registerCompanie()
})