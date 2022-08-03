import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { GroupDTO } from '../../group/dto/group-dto';
import { GroupService } from '../../group/group.service';
import { OrgDTO } from '../../organization/dto/org-dto';
import { OrganizationService } from '../../organization/organization.service';
import { ProjectDataDTO } from '../../project/dto/project-data-dto';
import { ProjectService } from '../../project/project.service';
import { UserTypeDTO } from '../../user-type/dto/user-type-dto';
import { UserTypeService } from '../../user-type/user-type.service';
import { UserDTO } from '../dto/user-dto';
import { UserSendDTO } from '../dto/user-send-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 
  displayedColumns: string[] = ['names', 'mobile','email','org','type','status','reset','action'];
  @ViewChild('myTable') myTable: MatTable<any>; 
  @ViewChild('orgModal') customTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;
  searchValue:string="";
  searchParam:string="";
  page:number=0;
  pageSize:number=10;
  sortDirection:string="desc";
  id:number=0;

  create:boolean=false;
  
  pageInfo:PageInfo;

  usersList:UserDTO[];
  groupsList:GroupDTO[];
  userTypes:UserTypeDTO[];
  orgsList:OrgDTO[];
  projectsList:ProjectDataDTO[];

  constructor(private fb: FormBuilder,private userService:UserService,private orgService:OrganizationService,
    private notificationService:NotificationService,private groupService:GroupService,
     private dialog: MatDialog,private userTypeService:UserTypeService,private projectService:ProjectService) { }

  ngOnInit(): void {
   
    this.getPaginatedUsers();
   
  }


  initiateForm(){
    if(!this.create){
      this.form = this.fb.group({
        userFullName: ['', [Validators.required]],
        userEmail: ['', [Validators.required,Validators.email]],
        userMobile: ['', [Validators.required]],
        userTypeId: ['', [Validators.required]],
        userStatus: ['', [Validators.required]],
        userReset: ['', [Validators.required]],
        groupsIds: [[],[Validators.required]],
        projectsIds: [[],[]],
        userOrgId:['',[Validators.required]],
    });
  }
  if(this.create){
    this.form = this.fb.group({
      userFullName: ['', [Validators.required]],
      userEmail: ['', [Validators.required,Validators.email]],
      userMobile: ['', [Validators.required]],
      userTypeId: ['', [Validators.required]],
      userStatus: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
      userReset: ['', [Validators.required]],
      groupsIds: [[],[Validators.required]],
      projectsIds: [[],[]],
      userOrgId:['',[Validators.required]],
     
  });
}
    }


  update(data:UserDTO){
    console.log(data.groups.map(x=>x.id))
  
    this.form.patchValue({
        userFullName: data.userFullName,
        userEmail: data.userEmail,
        userMobile: data.userMobile,
        userTypeId: data.userType.id,
        userStatus: data.userStatus,
        userReset: data.userReset,
        userOrgId: data.userOrg.id,
        groupsIds: data.groups.map(x=>x.id),
        projectsIds: data.projects.map(x=>x.id)
  });
  }


  openDialog(data:any) {
    if(data==null){
      this.create=true;
    }
    this.getAllGroups();
    this.getUserTypes();
    this.getOrganizations();
    this.getProjects();
    this.initiateForm();
   
    if(data!=null){
    this.id=data.id;
    this.update(data);
    this.create=false;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(this.customTemplate, dialogConfig);
  
}

handlePageEvent(event: PageEvent): void {
  this.page = event.pageIndex;
  this.pageSize = event.pageSize;
  this.getPaginatedUsers();
}


  public getPaginatedUsers(){

    if(this.isAnumber(this.searchValue)){
      this.searchParam="userMobileEQ";
    }
    if(!this.isAnumber(this.searchValue) &&this.searchValue!=="" && !this.searchValue?.includes('@')){
      this.searchParam="userFullNameEQ";
    }

    if(!this.isAnumber(this.searchValue) && this.searchValue?.includes('@')){
      this.searchParam="userEmailEQ";
    }
    const params=Utilities.getRequestParams(this.searchParam+this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.userService.getUsersList(params,).subscribe(res => {
    this.usersList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  getAllGroups(){
    this.groupService.getAllGroupsList().subscribe(res=>{
      this.groupsList= res['content'];
    });
  }

  getProjects(){
    this.projectService.getAllProjects().subscribe(res=>{
      this.projectsList=res['content'];
      console.log(this.projectsList)
    })
  }

  getOrganizations(){
    this.orgService.getOrganizationsList(null).subscribe(res=>{
      this.orgsList= res['content']['data'];
      console.log(this.orgsList)
    })
  }

  getUserTypes(){
    this.userTypeService.getUserTypesList().subscribe(res=>{
      this.userTypes= res['content'];
      console.log(this.userTypes)
    });
  }

  close(){

    this.dialog.closeAll();
    this.myTable.renderRows();
    this.initiateForm();
    this.id=0;
  }

  save(){
    if(this.id==0){
     const user= new UserSendDTO(this.form.value);
     console.log(JSON.stringify(user))
    this.userService.createUser(user).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.usersList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.usersList.push(res['content']);
    this.close();
    
    },
    error => {
      console.log(error)
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const user= new UserSendDTO(this.form.value);
   
    this.userService.updateUser(user,this.id).subscribe(res => {

    const index = this.usersList.findIndex(x=>x.id==this.id);
    this.usersList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:UserDTO){
    
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete user: "+data.userFullName}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.userService.deleteUser(data).subscribe(res => {

          const index = this.usersList.findIndex(x=>x.id==data.id);
          this.usersList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

  private isAnumber(value:string): boolean {
    return /^\d+$/.test(value);
  }

}
