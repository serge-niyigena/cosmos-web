export class OrgDTO {
    id: number;
    name: string;
    email: string;
    mobileNumber: string;;
    postalAddress: string;
    physicalAddress: string;

    constructor(orgData:any){
        this.name= orgData['name'];
        this.email= orgData['email'];
        this.mobileNumber= orgData['mobileNumber'];
        this.postalAddress= orgData['postalAddress'];
        this.physicalAddress = orgData['physicalAddress'];
    }
}
