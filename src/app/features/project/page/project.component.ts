import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { UserModelDTO } from 'src/app/core/dtos/user-model-dto';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { OrgDTO } from '../../organization/dto/org-dto';
import { OrganizationService } from '../../organization/organization.service';
import { ProjectCategoryDTO } from '../../project-category/dto/project-category-dto';
import { ProjectCategoryService } from '../../project-category/project-category.service';
import { ProjectStatusDTO } from '../../project-status/dto/project-status-dto';
import { ProjectStatusService } from '../../project-status/project-status.service';
import { UserDTO } from '../../users/dto/user-dto';
import { UserService } from '../../users/user.service';
import { ProjectDataDTO } from '../dto/project-data-dto';
import { ProjectDTO } from '../dto/project-dto';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-icons',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
 
  displayedColumns: string[] = ['name', 'ref','desc','wef','wet','selection','org','category','creationDate','status','action'];
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
  userModel:UserModelDTO;
  projectsList:ProjectDataDTO[];
  usersList:UserDTO[];
  statusList:ProjectStatusDTO[];
  categories:ProjectCategoryDTO[];
  orgsList:OrgDTO[];

  constructor(private fb: FormBuilder,private projectService:ProjectService,private userService:UserService,
    private notificationService:NotificationService,private statusService:ProjectStatusService,
     private dialog: MatDialog,private orgService:OrganizationService,
     private projectCategoryService:ProjectCategoryService,private authService:AuthenticationService) 
     { 
      authService.currentUser.subscribe(data=>{
        const jwtDecoded: {}  = JSON.parse(atob(data.content['token'].split(".")[1]));
        this.userModel=new UserModelDTO(jwtDecoded);
      })
     }

  ngOnInit(): void {
   
    this.getPaginatedProjects();
    this.getAllprojectUsers();
    this.getProjectCategories();
    this.getProjectStatuses();
    this.getOrganizations();
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]],
        projWef: ['', [Validators.required]],
        projWet: ['', [Validators.required]],
        selectionType: ['Square feet',[Validators.required]],
        organizationId:['',[Validators.required]],
        statusId: ['', [Validators.required]],
        categoryId: [[],[Validators.required]],
        usersIds: [[],[]]
    });
    }


  update(data:ProjectDataDTO){
   
    this.form.patchValue({
        name: data.name,
        desc: data.desc,
        projWef: data.projWef,
        projWet: data.projWet,
        selectionType: data.selectionType,
        statusId: data.projStatus.id,
        organizationId:data.projOrganization.id,
        categoryId: data.projectCategory.id,
        usersIds: data.users.map(u=>u.id)
  });
  // this.form.get('groupsIds')?.setValue(data.groups.map(x=>x.id));
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

handlePageEvent(event: PageEvent): void {
  this.page = event.pageIndex;
  this.pageSize = event.pageSize;
  this.getPaginatedProjects();
}


  private getPaginatedProjects(){
    let filter="users.projectUserUsers.idEQ"+this.userModel.userId;
    if(!this.userModel.userOrg.name.includes("osmos") && this.userModel.userGroups.filter(x=>{x.name.includes("admin")})){
      filter="projectOrganization.idEQ"+this.userModel.userOrg.id;
    }
    if(this.userModel.userOrg.name.includes("osmos")){
      filter="";
    }
    
    const params=Utilities.getRequestParams(filter,this.page,this.pageSize,this.sortDirection);
    this.projectService.getProjectsList(params).subscribe(res => {
    this.projectsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;

  
  });
  }

  getAllprojectUsers(){
    let filter="userOrg.idEQ"+this.userModel.userOrg.id;
  
    if(!this.userModel.userOrg.name.includes("osmos")){
      const params=Utilities.getRequestParams(filter,this.page,1000,this.sortDirection);
      this.userService.getUsersList(params).subscribe(res=>{
        this.usersList= res['content']['data'];
      });
    }

    if(this.userModel.userOrg.name.includes("osmos")){
    
      filter="users.eUsers.userOrg.idEQ"+this.userModel.userOrg.id; 
      const params= Utilities.getRequestParams(filter,this.page,500,this.sortDirection);
      this.userService.getUsersList(params).subscribe(res=>{
      this.usersList= res['content']['data'];
   
    });
    }
   
  }

  getOrganizations(){
    if(this.userModel.userOrg.name.includes("osmos")){
      this.orgService.getAllOrganizationsList().subscribe(res=>{
        this.orgsList= res['content'];
      });
    }
    else{
      let filter="idEQ"+this.userModel.userOrg.id;
      const params=Utilities.getRequestParams(filter,this.page,this.pageSize,this.sortDirection);
      this.orgService.getOrganizationsList(params).subscribe(res=>{
        this.orgsList= res['content']['data'];
      });
    }
   
  }
  

  getProjectStatuses(){
    this.statusService.getProjectStatusesList(null).subscribe(res=>{
      this.statusList= res['content'];
    });
  }

  getProjectCategories(){
    this.projectCategoryService.getProjectCategoriesList(null).subscribe(res=>{
      this.categories= res['content']['data'];
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
     const project= new ProjectDTO(this.form.value);
     
    this.projectService.createProject(project).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.projectsList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.projectsList.push(res['content']);
    this.close();
    
    },
    error => {

      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const project= new ProjectDTO(this.form.value);
   
    this.projectService.updateProject(project,this.id).subscribe(res => {

    const index = this.projectsList.findIndex(x=>x.id==this.id);
    this.projectsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:ProjectDataDTO){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete project: "+data.name}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.projectService.deleteProject(data).subscribe(res => {

          const index = this.projectsList.findIndex(x=>x.id==data.id);
          this.projectsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
