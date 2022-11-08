import { Toast } from "./toastify.js";

export class Request{
    static baseURL = "http://localhost:6278"
    static token = localStorage.getItem("token")

    static async login(body){
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
          
        const response = await fetch(`${this.baseURL}/auth/login`, options)
        .then(res => res.json())
        .then(res => {

            if(res.token){
                Toast.create("Logado Com sucesso", "green")
                localStorage.setItem("token", res.token)
                localStorage.setItem("is_admin", res.is_admin)
                localStorage.setItem("id", res.uuid)
            }else{
                Toast.create("Erro no login!", "red")
            }
            console.log(res.is_admin)

            if(res.is_admin == true){
                document.location.assign("./src/pages/Dashboard/sector/index.html")
            }else{
                document.location.assign("./src/pages/Dashboard/defaultUser/userDefault.html")
            }
            return res
        })
        .catch(err => {
            console.error(err)

            Toast.create("Erro no login!", "red")
        });

        return response
    }

    static async register(body){
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
          
        const response = await fetch(`${this.baseURL}/auth/register/user`, options)
        .then(res => res.json())
        .then(res => {
            
            if(res.uuid){
                Toast.create("Usuario criado com sucesso", "green")
            }else{
                Toast.create("Erro no Cadastro!", "red")   
            }

            return res
        })
        .catch(err => {
            console.error(err)

            Toast.create("Erro no Cadastro!", "red")
        });
        
        return response
    }

    static async listAllSectors(){
        const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this.token}`
            }
        };

        const response = await fetch(`${this.baseURL}/sectors`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

        return response
    }

    static async registerCompanie(body){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        };

        const response = await fetch(`${this.baseURL}/companies`, options)
        .then(res => res.json())
        .then(res => {
            if(res.uuid){
                Toast.create("Empresa criada com sucesso", "green")
            }else{
                Toast.create("Erro no Cadastro!", "red")   
            }

            return res
        })
        .catch(err => console.error(err));

        return response

    }
    
    static async listAllCompanie(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer `
            }
        };

        const response = await fetch(`${this.baseURL}/companies`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

        return response
    
    }

    static async searchDepartment(companie){
        const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this.token}`
            }
        };

        const response = await fetch(`${this.baseURL}/departments/${companie}`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

        return response
    }

    static async listAllUsers(){
        const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this.token}`
            }
        };

        const response = await fetch(`${this.baseURL}/users`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

        return response
    }

    static async registerDepartament(body){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
          };
          
        const response =  fetch(`${this.baseURL}/departments`, options)
        .then(res => res.json())
        .then(res => {
            if(res.uuid){
                Toast.create("Departamento criado com sucesso", "green")
            }else{
                Toast.create("Erro no Cadastro!", "red")   
            }

            return res
        })
        .catch(err => console.error(err));

        return response
    }

    static async editEmployees(body, idUser){
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        };
          
        const response = await fetch(`${this.baseURL}/admin/update_user/${idUser}`, options)
        .then(res => res.json())
        .then(res => {
            if(res.uuid){
                Toast.create("Usuario modificado com sucesso", "green")
            }else{
                Toast.create("Erro na Edição!", "red")   
            }

            return res
        })
        .catch(err => console.error(err));

        return response
    }

    static async hireUser(body){
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
          };
          
        const response = await fetch(`${this.baseURL}/departments/hire/`, options)
        .then(res => res.json())
        .then(res => {
            if(res.uuid){
                Toast.create("Usuario Contratado", "green")
            }else{
                Toast.create("Erro nas informaçoes!", "red")   
            }
        })
        .catch(err => console.error(err));
        
        return response
    }

    static async UserWithoutDepartment(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
          };
          
        const response = await fetch(`${this.baseURL}/admin/out_of_work/`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

        return response
    }

    static async AllDepartments(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
          };
          
        const response = await fetch(`${this.baseURL}/departments`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

        return response
    }

    static async dismiss(idUser){
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
        };
          
        const response = await fetch(`${this.baseURL}/departments/dismiss/${idUser}`, options)
        .then(res => res.json())
        .then(res => {
            if(res.uuid){
                Toast.create("Usuario Demitido com sucesso", "green")
            }else{
                Toast.create("Erro na Demição!", "red")   
            }

            return res
        })
        .catch(err => console.error(err));

        return response
    }

    static async editMyInformations(body){
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
          };
          
        const response = await fetch(`${this.baseURL}/users`, options)
        .then(res => res.json())
        .then(res => {
            if(res.uuid){
                Toast.create("Informaçoes Editadas com sucesso.", "green")
            }else{
                Toast.create("Erro nas informaçoes!", "red")   
            }
        })
        .catch(err => console.error(err));
        
        return response
    }

    static async listEmployeesofDepartament(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
          };
          
        const response = await fetch(`${this.baseURL}/users/departments/coworkers`, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

        return response
    }


}


