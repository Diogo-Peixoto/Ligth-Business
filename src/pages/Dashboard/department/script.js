import { DashboardAdmin, handleDarkMode, logout } from "../script.js";

logout()
handleDarkMode()
DashboardAdmin.departament()
DashboardAdmin.verificationAdmin()

document.getElementById("form_departament")[3].addEventListener("click",(e)=>{
    e.preventDefault()
    DashboardAdmin.creatCardDepartment()
})
        
document.getElementById("Edit_user")[3].addEventListener("click",(e)=>{
    e.preventDefault()
    DashboardAdmin.editEmployees()
})
        
document.getElementById("hireUSer")[2].addEventListener("click",(e)=>{
    e.preventDefault()
    DashboardAdmin.hireUser()
})
        
document.getElementById("dismiss")[2].addEventListener("click",(e)=>{
    e.preventDefault()
    DashboardAdmin.dismiss()
})
