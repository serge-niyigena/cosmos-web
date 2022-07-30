import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { GroupDTO } from '../../group/dto/group-dto';
import { GroupService } from '../../group/group.service';
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

 
  displayedColumns: string[] = ['names', 'mobile','email','type','status','reset','action'];
  @ViewChild('myTable') myTable: MatTable<any>; 
  @ViewChild('orgModal') customTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;
  searchValue:string;
  page:number=0;
  pageSize:number=10;
  sortDirection:string="desc";
  id:number=0;
  
  pageInfo:PageInfo;

  usersList:UserDTO[];
  groupsList:GroupDTO[];
  userTypes:UserTypeDTO[];

  constructor(private fb: FormBuilder,private orgService:UserService,
    private notificationService:NotificationService,private groupService:GroupService,
     private dialog: MatDialog,private userTypeService:UserTypeService) { }

  ngOnInit(): void {
   
    this.getPaginatedUsers();
    this.getAllGroups();
    this.getUserTypes();
  }


  initiateForm(){
      this.form = this.fb.group({
        userFullName: ['', [Validators.required]],
        userEmail: ['', [Validators.required,Validators.email]],
        userMobile: ['', [Validators.required]],
        userTypeId: ['', [Validators.required]],
        userStatus: ['', [Validators.required]],
        userReset: ['', [Validators.required]],
        groupsIds: [[],[Validators.required]],
        projectsIds: [[],[]]
    });
    }


  update(data:UserDTO){
    console.log(data.groups.map(x=>x.id))
  
    this.form.patchValue({
        userFullName: data.userFullName,
        userEmail: data.userEmail,
        userMobile: data.userMobile,
        userTypeId: data.userType.id,
        userStatus: data.userStatus,
        userReset: data.userStatus,
        groupsIds: [[],[Validators.required]],
        projectsIds: [[data.projects.forEach(x=>x.id)],[Validators.required]]
  });
   this.form.get('groupsIds')?.setValue(data.groups.map(x=>x.id));
  }


  openDialog(data:any) {
    this.initiateForm();
    
    if(data!=null){
    this.id=data.id;
    this.update(data);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(this.customTemplate, dialogConfig);
  
}


  private getPaginatedUsers(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getUsersList(params,).subscribe(res => {
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

  getUserTypes(){
    this.userTypeService.getUserTypesList(null).subscribe(res=>{
      this.userTypes= res['content'];
    });
  }

  close(){
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.dialog.closeAll();
    this.myTable.renderRows();
    this.initiateForm();
    this.id=0;
  }

  save(){
    if(this.id==0){
     const user= new UserSendDTO(this.form.value);
     console.log(JSON.stringify(user))
  //   this.orgService.createUser(user).subscribe(res => {
  //   this.notificationService.openSnackBar(res['message']);
    
  //   this.usersList.unshift(res['content']);
  //   this.paginator.pageSize= this.pageInfo.pageSize;

  //   //this.usersList.push(res['content']);
  //   this.close();
    
  //   },
  //   error => {
  //     console.log(error)
  //     this.notificationService.openSnackBar(error.error.message);
  
  // }
  //   );
  }

  if(this.id!==0){
    const user= new UserSendDTO(this.form.value);
   
    this.orgService.updateUser(user,this.id).subscribe(res => {

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
        this.orgService.deleteUser(data.id).subscribe(res => {

          const index = this.usersList.findIndex(x=>x.id==data.id);
          this.usersList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
