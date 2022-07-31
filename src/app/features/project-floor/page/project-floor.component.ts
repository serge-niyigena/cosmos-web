import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ProjectFloorDTO } from '../dto/project-floor-dto';
import { ProjectFloorData } from '../dto/project-floor-data';
import { ProjectDataDTO } from '../../project/dto/project-data-dto';
import { ProjectStatusDTO } from '../../project-status/dto/project-status-dto';
import { ProjectFloorFloorService } from '../project-floor.service';
import { ProjectStatusService } from '../../project-status/project-status.service';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './project-floor.component.html',
  styleUrls: ['./project-floor.component.css']
})
export class ProjectFloorFloorComponent implements OnInit {

  displayedColumns: string[] = ['floor', 'projectFloor','ref','measurement','desc','status','action'];
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

  projectFloorsList:ProjectFloorData[];
  projectsList:ProjectDataDTO[];
  statusList:ProjectStatusDTO[]
;

  constructor(private fb: FormBuilder,
    private logger: NGXLogger,private notificationService: NotificationService,
    private titleService: Title,private projectFloorService:ProjectFloorFloorService,
    private statusService:ProjectStatusService,private dialog: MatDialog,private projectService:ProjectService
  ) { }
 

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
      projectId: data.pFloorProject.id,
      pFloorValue: data.pFloorValue,
      pFloorRef: data.pFloorRef,
      pFloorMeasurement: data.pFloorMeasurement,
      pFloorDescription: data.pFloorDescription,
      statusId: data.pFloorStatus.id
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


  private getPaginatedProjectFloors(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.projectFloorService.getProjectFloorsList(params).subscribe(res => {
    this.projectFloorsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  getProjects(){
    this.projectService.getProjectsList(null).subscribe(res=>{
      this.projectsList= res['content'];
    });
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
     console.log(JSON.stringify(projectFloor))
  //   this.orgService.createProjectFloor(projectFloor).subscribe(res => {
  //   this.notificationService.openSnackBar(res['message']);
    
  //   this.projectFloorsList.unshift(res['content']);
  //   this.paginator.pageSize= this.pageInfo.pageSize;

  //   //this.projectFloorsList.push(res['content']);
  //   this.close();
    
  //   },
  //   error => {
  //     console.log(error)
  //     this.notificationService.openSnackBar(error.error.message);
  
  // }
  //   );
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

  delete(data:ProjectFloorDTO){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete project floor: "+data.pFloorValue}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.projectFloorService.deleteProjectFloor(data.id).subscribe(res => {
          const index = this.projectFloorsList.findIndex(x=>x.id==data.id);
          this.projectFloorsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }
}
