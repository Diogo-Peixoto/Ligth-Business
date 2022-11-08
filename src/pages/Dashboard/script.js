import { Request } from "../../script/api.js"

export function handleDarkMode(){
    const modeBtn = document.getElementById("mode-btn")
    const html = document.querySelector("html")
    
    modeBtn.addEventListener("click", ()=>{
        html.classList.toggle("dark-Mode")
    })
}

export function logout(){
    const btnLogiut  = document.getElementById("btn_logout")
    btnLogiut.addEventListener("click", ()=>{
        localStorage.clear()
        document.location.assign("../../../../index.html")
    })
}

export class DashboardAdmin{

    static verificationAdmin(){
        const admin = localStorage.getItem("is_admin")
        
        if(admin == "false"){
            document.location.assign("../../../../index.html")
            console.log("oi")
        }
    }

    static async sectors(){
        const data = await Request.listAllSectors()

        data.forEach(element => {
            DashboardAdmin.createCardSector(element.description)
        });

    }

    static createCardSector(description){
        const main = document.querySelector("main")

        const card = document.createElement("section")
        card.classList.add("card")

        const h2 = document.createElement("h2")
        h2.innerText = description

        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = `../../../assets/${description}.png`
        img.alt = description

        figure.append(img)

        card.append(h2, figure)
        main.append(card)

    }

    //-------------------------------------//

    static async registerCompanie(){
        const form = document.getElementById("form_companies")

        const name = form[0]
        const opening_hours= form[1]
        const description = form[2]
        const sector = form[3]

        const dataSector = await Request.listAllSectors()
        const sectorObject = dataSector.filter(element => element.description == sector.value)

        const body = {
            "name":`${name.value}`,
            "opening_hours":`${opening_hours.value}`,
            "description": `${description.value}`,
            "sector_uuid": `${sectorObject[0].uuid}`
        }


        await Request.registerCompanie(body)

        name.value = ""
        opening_hours.value = ""
        description.value = ""

        this.companies()
        
    }

    static async companies(){
        this.listAllCompanie("companieSelect")
        this.renderDOMSectorsOptions()

        const selectcompanie = document.getElementById("companieSelect")

        selectcompanie.addEventListener("change",()=>{
            if(selectcompanie.value != " "){
                this.renderDOMCompanie(selectcompanie.value)
            }
        })

        const selectSectors = document.getElementById("sectorsSelect")

        selectSectors.addEventListener("change",()=>{
            if(selectSectors.value != " "){
                this.renderDOMSectors(selectSectors.value)
            }
        })

    }

    static async listAllCompanie(id){
        const select = document.getElementById(id)
        select.innerHTML = ""
        const option = document.createElement("option")
        option.innerText = "Selecionar Empresa"
        option.value = ""

        select.append(option)

        const data = await Request.listAllCompanie()

        data.forEach(element =>{
            const option = document.createElement("option")
            option.innerText = element.name
            option.value = element.uuid

            select.append(option)
        })


    }


    static async searchDepartment(uuidCompanie){
        const departmentsData = await Request.searchDepartment(uuidCompanie) 

        return departmentsData
    }

    static async renderDOMCompanie(value){
        const ulDepartament = document.getElementById("ul_Departament_Companie")
        const ulEmployees = document.getElementById("ul_Employees_Companie")

        ulDepartament.innerHTML = ""
        ulEmployees.innerHTML = ""

        const departamentData =  await this.searchDepartment(value)
        
        if(departamentData[0]){

            departamentData.forEach(element=>{
                this.creatCardDepartament( element.name, element.description)
            })
        }else{
            const ul = document.getElementById("ul_Departament_Companie")
            const h5 = document.createElement("h5")
            h5.innerText = "Nenhum Departamento Cadastrado"
            ul.append(h5)
        }
        
        const employeesData = await this.searchEmployees(departamentData)

        if(employeesData[0]){
            employeesData.forEach(element =>{

                this.creatCardEmployees(element.username, element.email, element.professional_level, element.department_uuid, value)
            })
        }else{
            const ul = document.getElementById("ul_Employees_Companie")
            const h5 = document.createElement("h5")
            h5.innerText = "Nenhum Funcionario Cadrastrado"
            ul.append(h5)
        }
    }

    static creatCardDepartament( name, description){
        const ul = document.getElementById("ul_Departament_Companie")

        const li = document.createElement("li")
        const h5 = document.createElement("h5")
        h5.innerText = name
        const p = document.createElement("p")
        p.innerText = description

        li.append(h5,p)
        ul.append(li)

    }

    static async searchEmployees(departamenstos){
        const data = await Request.listAllUsers()
        const arrayfilter = []

        data.forEach(element => {
            
            if(element.department_uuid){

                departamenstos.forEach(object => {

                    if(element.department_uuid == object.uuid){
                        arrayfilter.push(element)
                    }
                })
            } 
            
        })
        
        return arrayfilter
    }

    static async creatCardEmployees(name, email, professional_level, uuid_department , value){
        const ul = document.getElementById("ul_Employees_Companie")

        const li = document.createElement("li")

        const h5 = document.createElement("h5")
        h5.innerText = name

        const pEmail = document.createElement("p")
        pEmail.innerText = email

        const pProfessional_level = document.createElement("p")
        pProfessional_level.innerText = professional_level

        const pDepartment = document.createElement("p")
        const departamentData =  await this.searchDepartment(value)
        const department = departamentData.filter(element => element.uuid == uuid_department)
        pDepartment.innerText = department[0].name

        li.append(h5, pEmail, pProfessional_level, pDepartment)
        ul.append(li)
    }

    
    static async renderDOMSectorsOptions(){
        const dataSetores = await Request.listAllSectors()
        
        dataSetores.forEach(element =>{
            this.creatDOMOpitionSectors(element.uuid, element.description)
            
        })
    }

    static async creatDOMOpitionSectors(uuidCompanie, name){
        const section = document.getElementById("sectorsSelect")

        const option = document.createElement("option")
        option.innerText = name
        option.value = uuidCompanie

        section.append(option)

    }

    static async searchCompanie(uuidSector){
        const dataCompanie = await Request.listAllCompanie()
        const companieFilterData = dataCompanie.filter(element => element.sectors.uuid == uuidSector)

        return companieFilterData
    }

    static async renderDOMSectors(uuidSector){
        const data =  await this.searchCompanie(uuidSector)
        const ul = document.getElementById("ul_Companie")

        ul.innerHTML = ""

        if(data[0]){
            data.forEach(element => {
                this.createCardCompanie(element.name, element.opening_hours, element.description)
            })
        }else{
            const ul = document.getElementById("ul_Companie")
            const h5 = document.createElement("h5")
            h5.innerText = "Nenhuma Empresa Cadastrada"
            ul.append(h5)
        }
    }

    static createCardCompanie(name, hours, description){
        const ul = document.getElementById("ul_Companie")
        
        const li = document.createElement("li")
        const h5 = document.createElement("h5")
        h5.innerText = name
        const pHours = document.createElement("p")
        pHours.innerText = hours
        const pDescription = document.createElement("p")
        pDescription.innerText = description

        li.append(h5,pHours,pDescription)
        ul.append(li)
    }

    //-----------------------------------------//

    static departament(){
        this.listAllCompanie("departamentSelect-createDepartament")
        this.listAllCompanie("departamentSelect-listDepartament")
        this.renderOpitionListEmployees()
        this.renderOpitionListHire()
        this.renderOpitionListDismiss()
        this.UsersWithoutJobs()

        const selectCompanie =  document.getElementById("departamentSelect-listDepartament")
        selectCompanie.addEventListener("change",()=>{
            if(selectCompanie.value != " "){
                this.renderOpitionListDepartments()   
            }
        })

        const selectDepartment =  document.getElementById("departamentSelect-selectDepartment")
        selectDepartment.addEventListener("change",()=>{
            if(selectDepartment.value != " "){
                this.renderDataDepartaments(selectDepartment.value ,selectCompanie.value)
            }
        })

    } 

    static async creatCardDepartment(){
        const form = document.getElementById("form_departament")

        const name = form[0]
        const description = form[1]
        const company = form[2]


        const body = {
            "name":`${name.value}`,
            "description": `${description.value}`,
            "company_uuid": `${company.value}`
        }


        await Request.registerDepartament(body)
        this.renderOpitionListDepartments()

        name.value = ""
        company.value = ""
        description.value = ""
    }

    static async renderOpitionListDepartments(){
        const selectCompanie =  document.getElementById("departamentSelect-listDepartament")
        const select =  document.getElementById("departamentSelect-selectDepartment")
        select.innerHTML = ""

        const option = document.createElement("option")
        option.innerText = "Selecionar Departamento"
        option.value = ""
        select.append(option)

        const data = await this.searchDepartment(selectCompanie.value)

        data.forEach(element=>{
            this.creatDOMOpitionListDepartments(element.name, element.uuid)
        })

    }

    static creatDOMOpitionListDepartments(name, uuid){
        const select =  document.getElementById("departamentSelect-selectDepartment")

        const option = document.createElement("option")
        option.innerText = name
        option.value = uuid

        select.append(option)
    }

    static async renderDataDepartaments(idDepartment, idCompanie){
        const ul = document.getElementById("ul_Employees_Sector")
        ul.innerHTML = ""

        const dataSectos = await this.searchDepartment(idCompanie)
        const sectorsSelect = dataSectos.filter(element => element.uuid == idDepartment)

        const h5DescriptionSector = document.getElementById("description_departament")
        h5DescriptionSector.innerText = sectorsSelect[0].description

        const dataEmployees = await this.searchEmployees(sectorsSelect)
        dataEmployees.forEach(element => {
            this.creatCardEmployeesDepartment(element.username, element.professional_level, element.kind_of_work)
        })
        
    }

    static creatCardEmployeesDepartment(name, professional_level, kind_of_work){
        const ul = document.getElementById("ul_Employees_Sector")
        const li = document.createElement("li")

        const h5 = document.createElement("h5")
        h5.innerText = name

        const professional_levelTag = document.createElement("p")
        professional_levelTag.innerText = professional_level

        const kind_of_workTag = document.createElement("p")
        kind_of_workTag.innerText = kind_of_work

        li.append(h5,professional_levelTag, kind_of_workTag)
        ul.append(li)
    }


    static async editEmployees(){
        const form = document.getElementById("Edit_user")

        const idUser = form[0]
        const professional_level = form[1]
        const kind_of_work = form[2]
        

        const body = {
            "kind_of_work":`${kind_of_work.value}`,
            "professional_level": `${professional_level.value}`,
        }


        Request.editEmployees(body, idUser.value)

        idUser.value = ""
        kind_of_work.value = ""
        professional_level.value = ""


    }

    static async renderOpitionListEmployees(){
        const data = await Request.listAllUsers()

        data.forEach(element=>{
            this.creatDOMOpitionEmployees(element.username,element.uuid)
        })

    }

    static creatDOMOpitionEmployees(username,uuid){
        const select =  document.getElementById("list_AllUsers")

        const option = document.createElement("option")
        option.innerText = username
        option.value = uuid

        select.append(option)
    }


    static  async hireUser(){
        const form = document.getElementById("hireUSer")

        const user_uuid = form[0]
        const department_uuid = form[1]

        const body = {
            "user_uuid":`${user_uuid.value}`,
            "department_uuid": `${department_uuid.value}`,
        }

        await Request.hireUser(body)
        const section = document.getElementById("UserHire")
        const sectionDepartments = document.getElementById("DepartmentsHire")
        section.innerHTML = ""
        sectionDepartments.innerHTML = ""

        this.renderOpitionListHire()
        this.UsersWithoutJobs()
    }
    
    static async renderOpitionListHire(){
        const dataUsers = await Request.UserWithoutDepartment()
        const dataDepartments = await Request.AllDepartments()
        
        dataUsers.forEach(element=>{
            this.creatDOMOpition(element.username,element.uuid,"UserHire")
        })

        dataDepartments.forEach(element=>{
            this.creatDOMOpition(element.name,element.uuid,"DepartmentsHire")
        })

    }

    static creatDOMOpition(name, uuid , selectId){
        const select =  document.getElementById(selectId)

        const option = document.createElement("option")
        option.innerText = name
        option.value = uuid
        select.append(option)
    }

    static async dismiss(){
        const form = document.getElementById("dismiss")

        const user_uuid = form[1]

        await Request.dismiss(user_uuid.value)


        this. renderOpitionListDismissEmployees()
        this.UsersWithoutJobs()
    }

    static async renderOpitionListDismiss(){
        const dataDepartments = await Request.AllDepartments()
        const selectDepartment =  document.getElementById("dismiss_departments")
        selectDepartment.innerHTML = ""
        
        dataDepartments.forEach(element=>{
            this.creatDOMOpition(element.name,element.companies.uuid,"dismiss_departments")
        })

        selectDepartment.addEventListener("change",async ()=>{
            if(selectDepartment.value != " "){
                this.renderOpitionListDismissEmployees()
            }
        })


    }

    static async renderOpitionListDismissEmployees(){
        const selectDepartment =  document.getElementById("dismiss_departments")
        const select = document.getElementById("dismiss_Employees")
        
        const departamentSelect = await this.searchDepartment(selectDepartment.value)
        const dataEmployees =  await this.searchEmployees(departamentSelect)
        select.innerHTML = ""

        dataEmployees.forEach(element=>{
            this.creatDOMOpition(element.username,element.uuid,"dismiss_Employees")
        })
    }

    static async UsersWithoutJobs(){
        const data =  await Request.UserWithoutDepartment()
        const ul = document.getElementById("Users_Without_Jobs")
        ul.innerHTML = ""

        data.forEach(element=> {
            this.creatCardUserWithoutJobs(element.username, element.professional_level, element.kind_of_work)
        })
    }

    static creatCardUserWithoutJobs(name, professional_level, kind_of_work){
        const ul = document.getElementById("Users_Without_Jobs")
        const li = document.createElement("li")

        const h5 = document.createElement("h5")
        h5.innerText = name

        const professional_levelTag = document.createElement("p")
        professional_levelTag.innerText = professional_level

        const kind_of_workTag = document.createElement("p")
        kind_of_workTag.innerText = kind_of_work

        li.append(h5,professional_levelTag, kind_of_workTag)
        ul.append(li)
    }

}

export class Dashboarduser{

    static async EditInformations(){
        const form = document.getElementById("form_EditInformation")

        const name = form[0]
        const email = form[1]
        const password = form[2]


        const body = {
            "username":`${name.value}`,
            "email": `${email.value}`,
            "password": `${password.value}`
        }

        Request.editMyInformations(body)

        name.value = ""
        email.value = ""
        password.value = ""
    }

    static async render(){
        const data = await Request.listEmployeesofDepartament()

        const department = document.getElementById("departmenName")
        const departmentDescription = document.getElementById("description_departament")
        department.innerText = data[0].name
        departmentDescription.innerText = data[0].description

        const dataCompanies = await Request.listAllCompanie()
        const companieUser = dataCompanies.filter(element => element.uuid == data[0].company_uuid)

        const companieName = document.getElementById("companie")
        const companieDescription = document.getElementById("description_companie")
        companieName.innerText = companieUser[0].name
        companieDescription.innerText = companieUser[0].description

        data[0].users.forEach(element => {
            this.creatCardEmployeesDepartment(element.username, element.professional_level, element.email)
        })
    }

    static creatCardEmployeesDepartment(name,professional_level,email){
        const ul = document.getElementById("ul_Employees_Companie")
        
        const li = document.createElement("li")
        const h5 = document.createElement("h5")
        h5.innerText = name
        const pProfessional_level = document.createElement("p")
        pProfessional_level.innerText = professional_level
        const pEmail = document.createElement("p")
        pEmail.innerText = email

        li.append(h5,pEmail,pProfessional_level)
        ul.append(li)
    }
    
}