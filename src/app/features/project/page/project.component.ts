import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
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

  projectsList:ProjectDataDTO[];
  usersList:UserDTO[];
  statusList:ProjectStatusDTO[];
  categories:ProjectCategoryDTO[]
;
  constructor(private fb: FormBuilder,private orgService:ProjectService,private userService:UserService,
    private notificationService:NotificationService,private statusService:ProjectStatusService,
     private dialog: MatDialog,private projectCategoryService:ProjectCategoryService) { }

  ngOnInit(): void {
   
    this.getPaginatedProjects();
    this.getAllprojectUsers();
    this.getProjectCategories();
    this.getProjectStatuses();
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]],
        projWef: ['', [Validators.required]],
        projWet: ['', [Validators.required]],
        selectionType: [{value:'Square feet', disabled: true} ,[Validators.required]],
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


  private getPaginatedProjects(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getProjectsList(params,).subscribe(res => {
    this.projectsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  getAllprojectUsers(){
    this.userService.getAllUsersList().subscribe(res=>{
      this.usersList= res['content'];
    });
  }

  getProjectStatuses(){
    this.statusService.getProjectStatusesList(null).subscribe(res=>{
      this.statusList= res['content'];
    });
  }

  getProjectCategories(){
    this.projectCategoryService.getProjectCategoriesList(null).subscribe(res=>{
      this.categories= res['content'];
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
     console.log(JSON.stringify(project))
  //   this.orgService.createProject(project).subscribe(res => {
  //   this.notificationService.openSnackBar(res['message']);
    
  //   this.projectsList.unshift(res['content']);
  //   this.paginator.pageSize= this.pageInfo.pageSize;

  //   //this.projectsList.push(res['content']);
  //   this.close();
    
  //   },
  //   error => {
  //     console.log(error)
  //     this.notificationService.openSnackBar(error.error.message);
  
  // }
  //   );
  }

  if(this.id!==0){
    const project= new ProjectDTO(this.form.value);
   
    this.orgService.updateProject(project,this.id).subscribe(res => {

    const index = this.projectsList.findIndex(x=>x.id==this.id);
    this.projectsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:ProjectDTO){
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
        this.orgService.deleteProject(data.id).subscribe(res => {

          const index = this.projectsList.findIndex(x=>x.id==data.id);
          this.projectsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
