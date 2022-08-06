import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { UserModelDTO } from 'src/app/core/dtos/user-model-dto';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { FloorItemData } from '../../floor-item/dto/floor-item-data';
import { FloorItemService } from '../../floor-item/floor-item.service';
import { ItemData } from '../../item/dto/item-data';
import { ItemService } from '../../item/item.service';
import { ProjectFloorData } from '../../project-floor/dto/project-floor-data';
import { ProjectFloorService } from '../../project-floor/project-floor.service';
import { ProjectStatusDTO } from '../../project-status/dto/project-status-dto';
import { ProjectDataDTO } from '../../project/dto/project-data-dto';
import { ProjectService } from '../../project/project.service';
import { UsageStatusService } from '../../usage-status/usage-status.service';
import { DamagedService } from '../damaged.service';
import { DamagedData } from '../dto/damaged-data';
import { DamagedDTO } from '../dto/damaged-dto';

@Component({
  selector: 'app-damaged-item',
  templateUrl: './damaged-item.component.html',
  styleUrls: ['./damaged-item.component.css']
})
export class DamagedItemComponent implements OnInit {

  displayedColumns: string[] = ['item', 'floor','project','quantity','date','desc','action'];
  @ViewChild('myTable') myTable: MatTable<any>; 
  @ViewChild('damagedModal') customTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  userModel:UserModelDTO;
  form: FormGroup;
  searchValue:string="";
  searchParam:string="";
  page:number=0;
  pageSize:number=10;
  sortDirection:string="desc";
  id:number=0;

  projectId:string="";
  floorId:string="";
  itemsFilter:string="";

  filterByProject="floorItem.projectFloor.projectFloorProject.idEQ";
  filterByFloor="floorItem.projectFloor.idEQ";
  updateItemUsage : boolean=false;
  
  pageInfo:PageInfo;

  damagedItemsList:DamagedData[];
  projectsList:ProjectDataDTO[];
  projectFloorsList:ProjectFloorData[];
  floorItems:FloorItemData[];
  

  constructor(private fb: FormBuilder,private router:Router,
    private logger: NGXLogger,private notificationService: NotificationService,
    private authService:AuthenticationService, private projectService: ProjectService,
    private damagedItemService:DamagedService,private itemService:ItemService,
    private statusService:UsageStatusService,private dialog: MatDialog,
    private projectFloorService:ProjectFloorService,private floorItemService:FloorItemService
  ) {
    authService.currentUser.subscribe(data=>{
      if( data?.['content']!==undefined){
      const jwtDecoded: {}  = JSON.parse(atob(data.content['token'].split(".")[1]));
      this.userModel=new UserModelDTO(jwtDecoded);
      }
    }) 
   }
 

  ngOnInit(): void {
    this.getProjects();
  }


  initiateForm(){
      this.form = this.fb.group({
        damagedDate:['', [Validators.required]],
        damagedDesc:['', [Validators.required]],
        damagedQuantity:['', [Validators.required]],
        damagedFloorItemId:['',[Validators.required]]
    });
    }


  update(data:DamagedData){
   
    this.form.patchValue({
      damagedDate:data.damagedDate,
      damagedDesc:data.damagedDesc,
      damagedQuantity:data.damagedQuantity,
      damagedFloorItemId:data.floorItem.id
  });
  }


  openDialog(data:any) {
    this.initiateForm();
    
    if(data!=null){
    this.id=data.damagedId;
    this.update(data);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(this.customTemplate, dialogConfig);
  
  }


  private getPaginatedDamagedItems(search:string){

    const params=Utilities.getRequestParams(search,this.page,this.pageSize,this.sortDirection);
    this.damagedItemService.getDamagedItemsList(params).subscribe(res => {
    this.damagedItemsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  getProjects(){
    let projectFIlter="users.projectUserUsers.idEQ"+this.userModel.userId
    if(!this.userModel.userOrg.name.includes("osmos") && this.userModel.userGroups.filter(x=>{x.name.includes("admin")})){
      projectFIlter="projectOrganization.idEQ"+this.userModel.userOrg.id;
      const params= Utilities.getRequestParams(projectFIlter,this.page,this.pageSize,this.sortDirection);
      this.projectService.getProjectsList(params).subscribe(res=>{
        this.projectsList= res['content']['data'];
      });
    }
    if(this.userModel.userOrg.name.includes("osmos")){
      projectFIlter="";
      const params= Utilities.getRequestParams(projectFIlter,this.page,this.pageSize,this.sortDirection);
      this.projectService.getProjectsList(params).subscribe(res=>{
        this.projectsList= res['content']['data'];
      });
    }
    else{
      const params= Utilities.getRequestParams(projectFIlter,this.page,100,this.sortDirection);
      this.projectService.getProjectsList(params).subscribe(res=>{
        this.projectsList= res['content']['data'];
      });
    }

  }

  getProjectFloors(){
    this.itemsFilter=this.filterByProject+this.projectId;
   this.getPaginatedDamagedItems(this.itemsFilter
    );

    let filter ="projectFloorProject.idEQ"+this.projectId;
    const params= Utilities.getRequestParams(filter,this.page,100,this.sortDirection)
    this.projectFloorService.getProjectFloorsList(params).subscribe(res=>{
      this.projectFloorsList= res['content']['data'];
    });
  }

  getFloorItems(){
    this.itemsFilter=this.filterByFloor+this.floorId;
    this.getPaginatedDamagedItems(this.itemsFilter);
     let filter ="projectFloor.idEQ"+this.floorId;
     const params= Utilities.getRequestParams(filter,this.page,400,this.sortDirection)
     this.floorItemService.getFloorItemsList(params).subscribe(res=>{
       this.floorItems= res['content']['data'];
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
     const damagedItem= new DamagedDTO(this.form.value);
    
    this.damagedItemService.createDamagedItem(damagedItem).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.damagedItemsList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.damagedItemsList.push(res['content']);
    this.close();
    
    },
    error => {
 
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0 ){
    const damagedItem= new DamagedDTO(this.form.value);
   console.log("Id: "+this.id)
    this.damagedItemService.updateDamagedItem(damagedItem,this.id).subscribe(res => {

    const index = this.damagedItemsList.findIndex(x=>x.damagedId==this.id);
    this.damagedItemsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
 
  }

  delete(data:DamagedData){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete Damaged item: "+data.floorItem.floorItemItem.name}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.damagedItemService.deleteDamagedItem(data).subscribe(res => {
          const index = this.damagedItemsList.findIndex(x=>x.damagedId==data.damagedId);
          this.damagedItemsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

  handlePageEvent(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    if(this.itemsFilter!==""){
    this.getPaginatedDamagedItems(this.itemsFilter);
    }
  }

}
