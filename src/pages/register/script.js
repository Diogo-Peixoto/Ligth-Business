import { Request } from "../../script/api.js"

document.querySelector("button").addEventListener("click",(e)=>{
    e.preventDefault()
    Register.captureInformationForm()
})

export class Register {
    static form = document.querySelector("form")
    
    static captureInformationForm(){

        const name = this.form[0]
        const professional_level = this.form[1]
        const email = this.form[2]
        const password = this.form[3]

        const body = {
            "password":`${password.value}`,
            "email":`${email.value}`,
            "professional_level": `${professional_level.value}`,
            "username": `${name.value}`
        }

        Request.register(body)

        name.value = ""
        professional_level.value = ""
        email.value = ""
        password.value = ""

    }
}

