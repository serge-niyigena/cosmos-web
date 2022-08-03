import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ItemData } from '../../item/dto/item-data';
import { ItemService } from '../../item/item.service';
import { ProjectFloorData } from '../../project-floor/dto/project-floor-data';
import { ProjectFloorService } from '../../project-floor/project-floor.service';
import { ProjectStatusDTO } from '../../project-status/dto/project-status-dto';
import { UsageStatusService } from '../../usage-status/usage-status.service';
import { FloorItemData } from '../dto/floor-item-data';
import { FloorItemDTO } from '../dto/floor-item-dto';
import { Location } from '@angular/common';
import { FloorItemService } from '../floor-item.service';

@Component({
  selector: 'app-floor-item',
  templateUrl: './floor-item.component.html',
  styleUrls: ['./floor-item.component.css']
})
export class FloorItemComponent implements OnInit {


  displayedColumns: string[] = ['floor', 'floorItem','normalQuantity','maximumQuantity','usedQuantity','floorItemStatus','usageReport','action'];
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

  updateItemUsage : boolean=false;
  
  pageInfo:PageInfo;

  floorItemsList:FloorItemData[];
  projectFloorsList:ProjectFloorData[];
  itemsList:ItemData[];
  statusList:ProjectStatusDTO[];

  projectFLoor:any;
  projectFloorId:number;

  constructor(private fb: FormBuilder,private location:Location,
    private logger: NGXLogger,private notificationService: NotificationService,
    private titleService: Title,private floorItemService:FloorItemService,private itemService:ItemService,
    private statusService:UsageStatusService,private dialog: MatDialog,private projectFloorService:ProjectFloorService
  ) { }
 

  ngOnInit(): void {
   this.projectFLoor=this.location.getState();
   this.projectFLoor = this.projectFLoor?.data
   if(this.projectFLoor?.id!=null){
   
    this.searchParam="projectFloor.idEQ"+this.projectFLoor.id;
   }
    
    this.getPaginatedFloorItems();
    this.getProjectFloors();
    this.getStatuses();
    this.getAllItems()
  }


  initiateForm(){
      this.form = this.fb.group({
        floorItemNormalQuantity:['', [Validators.required]],
        floorItemMaximumQuantity:['', [Validators.required]],
        floorItemUsedQuantity:['', [Validators.required]],
        floorItemStatusReport:['', []],
        floorItemItemId:['', [Validators.required]],
        floorItemProjectFloorId:['', [Validators.required]]
    });
    }


  update(data:FloorItemData){
   
    this.form.patchValue({
      floorItemNormalQuantity:data.floorItemNormalQuantity,
        floorItemMaximumQuantity:data.floorItemMaximumQuantity,
        floorItemUsedQuantity:data.floorItemUsedQuantity,
        floorItemStatusReport:data.floorItemStatusReport,
        floorItemItemId:data.floorItemItem.id,
        floorItemProjectFloorId:data.projectFloor.id
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

updateUsedItem(data:FloorItemData) {
  this.updateItemUsage=true;
  this.form = this.fb.group({
    floorItemNormalQuantity:[{value:data.floorItemNormalQuantity,disabled:true}, [Validators.required]],
    floorItemMaximumQuantity:[{value:data.floorItemMaximumQuantity,disabled:true}, [Validators.required]],
    floorItemUsedQuantity:['', [Validators.required]],
    floorItemStatusReport:[{value:data.floorItemStatusReport,disabled:true}, []],
    floorItemItemId:[{value:data.floorItemItem.id,disabled:true}, [Validators.required]],
    floorItemProjectFloorId:[{value:data.projectFloor.id,disabled:true}, [Validators.required]]
});
  this.id=data.id;
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  this.dialog.open(this.customTemplate, dialogConfig);

}


  private getPaginatedFloorItems(){

    const params=Utilities.getRequestParams(this.searchParam,this.page,this.pageSize,this.sortDirection);
    this.floorItemService.getFloorItemsList(params).subscribe(res => {
    this.floorItemsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;

    console.log(this.floorItemsList)
  
  });
  }

  getProjectFloors(){
    this.projectFloorService.getProjectFloorsList(null).subscribe(res=>{
      this.projectFloorsList= res['content']['data'];
    });
  }

  getAllItems(){this.itemService.getAllItemsList().subscribe(res=>{
      this.itemsList= res['content'];
    });
  }

  getStatuses(){
    this.statusService.getUsageStatusesList(null).subscribe(res=>{
      this.statusList= res['content'];
    });
  }


  close(){

    this.dialog.closeAll();
    this.myTable.renderRows();
    this.initiateForm();
    this.id=0;
    this.updateItemUsage=false;
  }

  save(){
    if(this.id==0){
     const floorItem= new FloorItemDTO(this.form.value);
     console.log(JSON.stringify(floorItem))
    this.floorItemService.createFloorItem(floorItem).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.floorItemsList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.floorItemsList.push(res['content']);
    this.close();
    
    },
    error => {
      console.log(error)
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0 && !this.updateItemUsage){
    const floorItem= new FloorItemDTO(this.form.value);
   
    this.floorItemService.updateFloorItem(floorItem,this.id).subscribe(res => {

    const index = this.floorItemsList.findIndex(x=>x.id==this.id);
    this.floorItemsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  if(this.updateItemUsage){
   const floorItem= new FloorItemDTO(this.form.getRawValue());
  
    console.log(floorItem)
    this.floorItemService.updateFloorItemUsage(this.id,floorItem).subscribe(res => {

    const index = this.floorItemsList.findIndex(x=>x.id==this.id);
    this.floorItemsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:FloorItemData){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete floor item: "+data.projectFloor.floorValue}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.floorItemService.deleteFloorItem(data).subscribe(res => {
          const index = this.floorItemsList.findIndex(x=>x.id==data.id);
          this.floorItemsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
