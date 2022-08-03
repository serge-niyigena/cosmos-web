export class AuthDTO {
    password: string;
    userContact: number;

    constructor(data:any){
        this.userContact= data['contact'];
        this.password= data['password']
    }
}
