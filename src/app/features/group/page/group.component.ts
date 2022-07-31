import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { RoleDTO } from '../../roles/dto/role-dto';
import { RoleService } from '../../roles/role.service';
import { UserDTO } from '../../users/dto/user-dto';
import { UserService } from '../../users/user.service';
import { GroupData } from '../dto/group-data';
import { GroupDTO } from '../dto/group-dto';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

 
  displayedColumns: string[] = ['name', 'desc'];
  @ViewChild('myTable') myTable: MatTable<any>; 
  @ViewChild('groupModal') customTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;
  searchValue:string;
  page:number=0;
  pageSize:number=10;
  sortDirection:string="desc";
  id:number=0;
  
  pageInfo:PageInfo;

  groupsList:GroupDTO[];
  usersList:UserDTO[];
  roles:RoleDTO[];

  constructor(private fb: FormBuilder,private userService :UserService,private roleService:RoleService,
    private notificationService:NotificationService,private groupService:GroupService,
     private dialog: MatDialog,) { }

  ngOnInit(): void {
   
    this.getPaginatedGroups();
    this.getAllUsers();
    this.getAllRoles();
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required,Validators.email]],
        rolesIds: ['', [Validators.required]],
        usersIds: ['', []]
    });
    }


  update(data:GroupData){
  
    this.form.patchValue({
        name: data.name,
        desc: data.desc,
        rolesIds: data.roles.map(r=>r.roleId),
        usersIds: data.users.map(u=>u.id)
    
  });
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


  private getPaginatedGroups(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.groupService.getGroupsList(params,).subscribe(res => {
    this.groupsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  getAllUsers(){
    this.userService.getAllUsersList().subscribe(res=>{
      this.groupsList= res['content'];
    });
  }

  getAllRoles(){
    this.userService.getAllUsersList().subscribe(res=>{
      this.usersList= res['content'];
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
     const group= new GroupDTO(this.form.value);
     console.log(JSON.stringify(group))
  //   this.orgService.createGroup(group).subscribe(res => {
  //   this.notificationService.openSnackBar(res['message']);
    
  //   this.groupsList.unshift(res['content']);
  //   this.paginator.pageSize= this.pageInfo.pageSize;

  //   //this.groupsList.push(res['content']);
  //   this.close();
    
  //   },
  //   error => {
  //     console.log(error)
  //     this.notificationService.openSnackBar(error.error.message);
  
  // }
  //   );
  }

  if(this.id!==0){
    const group= new GroupDTO(this.form.value);
   
    this.groupService.updateGroup(group,this.id).subscribe(res => {

    const index = this.groupsList.findIndex(x=>x.id==this.id);
    this.groupsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:GroupDTO){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete group: "+data.name}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.groupService.deleteGroup(data.id).subscribe(res => {

          const index = this.groupsList.findIndex(x=>x.id==data.id);
          this.groupsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
