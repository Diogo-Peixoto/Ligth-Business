import { Dashboarduser, handleDarkMode, logout } from "../script.js";

document.getElementById("form_EditInformation")[3].addEventListener("click",(e)=>{
    e.preventDefault()
    Dashboarduser.EditInformations()
})



logout()
handleDarkMode()
Dashboarduser.render()