import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ItemTypeDTO } from '../dto/item-type-dto';
import { ItemTypeService } from '../item-type.service';

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.component.html',
  styleUrls: ['./item-type.component.css']
})
export class ItemTypeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'desc','action'];
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

  itemTypesList:ItemTypeDTO[];

  constructor(private fb: FormBuilder,private orgService:ItemTypeService,
    private notificationService:NotificationService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.getPaginatedItemTypes();
    
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]]
    });
    }


  update(data:ItemTypeDTO){
    this.form.patchValue({
      name: data.name,
      desc:data.desc
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


  private getPaginatedItemTypes(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getItemTypesList(params,).subscribe(res => {
    this.itemTypesList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  close(){
    this.paginator.pageSize=this.pageInfo?.pageSize;
    this.dialog.closeAll();
    this.myTable.renderRows();
    this.initiateForm();
    this.id=0;
  }

  save(){
    if(this.id==0){
    const org= new ItemTypeDTO(this.form.value);
    this.orgService.createItemType(org).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.itemTypesList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.itemTypesList.push(res['content']);
    this.close();
    
    },
    error => {
      console.log(error)
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const org= new ItemTypeDTO(this.form.value);
   
    this.orgService.updateItemType(org,this.id).subscribe(res => {

    const index = this.itemTypesList.findIndex(x=>x.id==this.id);
    this.itemTypesList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:ItemTypeDTO){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete organization: "+data.name}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.orgService.deleteItemType(data.id).subscribe(res => {

          const index = this.itemTypesList.findIndex(x=>x.id==data.id);
          this.itemTypesList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }
}
