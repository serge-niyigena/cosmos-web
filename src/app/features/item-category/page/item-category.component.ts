import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ItemCategoryDTO } from '../dto/item-category-dto';
import { ItemCategoryService } from '../item-category.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'descrition','action'];
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

  itemCategories:ItemCategoryDTO[];

  constructor(private fb: FormBuilder,private orgService:ItemCategoryService,
    private notificationService:NotificationService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.getPaginatedItemCategorys();
    
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]]
    });
    }


  update(data:ItemCategoryDTO){
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


  private getPaginatedItemCategorys(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getItemCategorysList(params,).subscribe(res => {
    this.itemCategories = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
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
    const org= new ItemCategoryDTO(this.form.value);
    this.orgService.createItemCategory(org).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.itemCategories.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.itemCategories.push(res['content']);
    this.close();
    
    },
    error => {
      console.log(error)
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const org= new ItemCategoryDTO(this.form.value);
   
    this.orgService.updateItemCategory(org,this.id).subscribe(res => {

    const index = this.itemCategories.findIndex(x=>x.id==this.id);
    this.itemCategories.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:ItemCategoryDTO){
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
        this.orgService.deleteItemCategory(data.id).subscribe(res => {

          const index = this.itemCategories.findIndex(x=>x.id==data.id);
          this.itemCategories.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
