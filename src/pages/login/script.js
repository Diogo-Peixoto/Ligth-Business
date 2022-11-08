import { Request } from "../../script/api.js"


const token = localStorage.getItem("token")
const admin = localStorage.getItem("is_admin")
if(token){
    if(admin == "true"){
        document.location.assign("./src/pages/Dashboard/sector/index.html")
    }
}

document.querySelector("button").addEventListener("click",(e)=>{
    e.preventDefault()
    Login.captureInformationForm()
})

export class Login {
    static form = document.querySelector("form")
    
    static captureInformationForm(){
        const email = this.form[0]
        const password = this.form[1]

        const body = {
            "email": `${email.value}`,
            "password": `${password.value}`
        }

        Request.login(body)

        email.value = ""
        password.value = ""

    }
}

