import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ProjectFloorDTO } from '../dto/project-floor-dto';
import { ProjectFloorData } from '../dto/project-floor-data';
import { ProjectDataDTO } from '../../project/dto/project-data-dto';
import { ProjectStatusDTO } from '../../project-status/dto/project-status-dto';
import { ProjectFloorService } from '../project-floor.service';
import { ProjectStatusService } from '../../project-status/project-status.service';
import { ProjectService } from '../../project/project.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserModelDTO } from 'src/app/core/dtos/user-model-dto';

@Component({
  selector: 'app-customer-list',
  templateUrl: './project-floor.component.html',
  styleUrls: ['./project-floor.component.css']
})
export class ProjectFloorFloorComponent implements OnInit {

  displayedColumns: string[] = ['project', 'floor','ref','measurement','desc','status','items','action'];
  @ViewChild('myTable') myTable: MatTable<any>; 
  @ViewChild('orgModal') customTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;
  searchValue:string;
  projFilter:string="";
  page:number=0;
  pageSize:number=10;
  sortDirection:string="desc";
  id:number=0;
  pFloorFilter:string="";
  projectId:number=0;
  pageInfo:PageInfo;
  userModel:UserModelDTO;
  projectFloorsList:ProjectFloorData[];
  projectsList:ProjectDataDTO[];
  statusList:ProjectStatusDTO[]
;

  constructor(private fb: FormBuilder,
    private logger: NGXLogger,private notificationService: NotificationService,
    private titleService: Title,private projectFloorService:ProjectFloorService,
    private statusService:ProjectStatusService,private dialog: MatDialog,
    private projectService:ProjectService,private authService:AuthenticationService
  ) { authService.currentUser.subscribe(data=>{
    const jwtDecoded: {}  = JSON.parse(atob(data.content['token'].split(".")[1]));
    this.userModel=new UserModelDTO(jwtDecoded);
  }) }
 

  ngOnInit(): void {
   
    this.getPaginatedProjectFloors();
    this.getProjects();
    this.getStatuses();
  }


  initiateForm(){
      this.form = this.fb.group({
        projectId: ['', [Validators.required]],
        pFloorValue: ['', [Validators.required]],
        pFloorRef: ['', [Validators.required]],
        pFloorMeasurement: ['', [Validators.required]],
        pFloorDescription: ['',[Validators.required]],
        statusId: ['', [Validators.required]]
    });
    }


  update(data:ProjectFloorData){
   
    this.form.patchValue({
      projectId: data.floorProject.id,
      pFloorValue: data.floorValue,
      pFloorRef: data.floorRef,
      pFloorMeasurement: data.floorMeasurement,
      pFloorDescription: data.floorDescription,
      statusId: data.floorStatus.id
  });
  }


  handlePageEvent(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPaginatedProjectFloors();
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


  public getPaginatedProjectFloors(){

    this.pFloorFilter="projectFloorProject.idEQ"+this.projectId;
    const params=Utilities.getRequestParams(this.pFloorFilter,this.page,this.pageSize,this.sortDirection);
    this.projectFloorService.getProjectFloorsList(params).subscribe(res => {
    this.projectFloorsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  getProjects(){
   let projFilter="users.projectUserUsers.idEQ"+this.userModel.userId;



    if(!this.userModel.userOrg.name.includes("osmos") && this.userModel.userGroups.filter(x=>{x.name.includes("admin")})){
      projFilter="projectOrganization.idEQ"+this.userModel.userOrg.id;
      const params= Utilities.getRequestParams(projFilter,this.page,this.pageSize,this.sortDirection);
      this.projectService.getProjectsList(params).subscribe(res=>{
        this.projectsList= res['content']['data'];
      });
    }
    if(this.userModel.userOrg.name.includes("osmos")){
      projFilter="";
      const params= Utilities.getRequestParams(projFilter,this.page,this.pageSize,this.sortDirection);
      this.projectService.getProjectsList(params).subscribe(res=>{
        this.projectsList= res['content']['data'];
      });
    }
    else{
      const params= Utilities.getRequestParams(projFilter,this.page,100,this.sortDirection);
      this.projectService.getProjectsList(params).subscribe(res=>{
        this.projectsList= res['content']['data'];
      });
    }

   
  }

  getStatuses(){
    this.statusService.getProjectStatusesList(null).subscribe(res=>{
      this.statusList= res['content'];
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
     const projectFloor= new ProjectFloorDTO(this.form.value);
   
    this.projectFloorService.createProjectFloor(projectFloor).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.projectFloorsList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.projectFloorsList.push(res['content']);
    this.close();
    
    },
    error => {

      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const projectFloor= new ProjectFloorDTO(this.form.value);
   
    this.projectFloorService.updateProjectFloor(projectFloor,this.id).subscribe(res => {

    const index = this.projectFloorsList.findIndex(x=>x.id==this.id);
    this.projectFloorsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:ProjectFloorData){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete project floor: "+data.floorValue}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.projectFloorService.deleteProjectFloor(data).subscribe(res => {
          const index = this.projectFloorsList.findIndex(x=>x.id==data.id);
          this.projectFloorsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }
}
