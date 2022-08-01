export class UserSendDTO {

    groupsIds: number[];
    projectsIds: number[];
    userEmail: string;
    userFullName: string;
    userMobile: string;
    userPassword: string;
    userReset: string;
    userStatus: string;
    userTypeId: number;
    userOrgId:number;

    constructor(data:any){
        if(data?.groupsIds!=null){
            this.groupsIds= data.groupsIds;
        }
        if(data?.projectsIds!=null){
           this.projectsIds= data.projectsIds 
        }
        this.userEmail= data.userEmail;
        this.userFullName=data.userFullName;
        this.userMobile=data.userMobile;
        if(data?.userPassword!=null){
            this.userPassword=data.userPassword;
        }
        this.userReset=data.userReset;
        this.userStatus=data.userStatus;
        this.userTypeId= data.userTypeId;
        this.userOrgId =data.userOrgId

    }

}
