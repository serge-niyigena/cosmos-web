import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ItemCategoryDTO } from '../../item-category/dto/item-category-dto';
import { ItemCategoryService } from '../../item-category/item-category.service';
import { ItemTypeDTO } from '../../item-type/dto/item-type-dto';
import { ItemTypeService } from '../../item-type/item-type.service';
import { RoleDTO } from '../../roles/dto/role-dto';
import { RoleService } from '../../roles/role.service';
import { UnitTypeDTO } from '../../unit-type/dto/unit-type-dto';
import { UnitTypeService } from '../../unit-type/unit-type.service';
import { UserDTO } from '../../users/dto/user-dto';
import { UserService } from '../../users/user.service';
import { ItemData } from '../dto/item-data';
import { ItemDTO } from '../dto/item-dto';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

 
 
  displayedColumns: string[] = ['name', 'desc','type','category','unit','action'];
  @ViewChild('myTable') myTable: MatTable<any>; 
  @ViewChild('itemModal') customTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;
  searchValue:string;
  page:number=0;
  pageSize:number=10;
  sortDirection:string="desc";
  id:number=0;
  
  pageInfo:PageInfo;

  itemsList:ItemDTO[];
  categories:ItemCategoryDTO[];
  itemTypes:ItemTypeDTO[];
  unitTypes:UnitTypeDTO[];

  constructor(private fb: FormBuilder,private categoryService :ItemCategoryService,private itemTypeService:ItemTypeService,
    private notificationService:NotificationService,private itemService:ItemService,
     private dialog: MatDialog,private unitTypeService:UnitTypeService) { }

  ngOnInit(): void {
   
    this.getPaginatedItems();
   
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]],
        itemCategoryId: ['', [Validators.required]],
        itemUnitTypeId: ['', [Validators.required]],
        itemTypeId: ['', [Validators.required]]
    });
    }


  update(data:ItemData){
  
    this.form.patchValue({
      name: data.name,
      desc: data.desc,
      itemCategoryId: data.itemCategory.id,
      itemUnitTypeId: data.itemUnitType.id,
      itemTypeId: data.itemType.id,
    
  });
  }

  openDialog(data:any) {
    this.getAllCategories();
    this.getAllItemTypes();
    this.getAlUnitTypes();
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


  private getPaginatedItems(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.itemService.getItemsList(params,).subscribe(res => {
    this.itemsList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  getAllCategories(){
    this.categoryService.getItemCategorysList(null).subscribe(res=>{
      this.categories= res['content']['data'];
    });
  }

  getAllItemTypes(){
    this.itemTypeService.getItemTypesList(null).subscribe(res=>{
      this.itemTypes= res['content']['data'];
    });
  }

  getAlUnitTypes(){
    this.unitTypeService.getUnitTypesList(null).subscribe(res=>{
      this.unitTypes= res['content']['data'];
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
     const item= new ItemDTO(this.form.value);
     console.log(JSON.stringify(item))
    this.itemService.createItem(item).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.itemsList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.itemsList.push(res['content']);
    this.close();
    
    },
    error => {
      console.log(error)
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const item= new ItemDTO(this.form.value);
   
    this.itemService.updateItem(item,this.id).subscribe(res => {

    const index = this.itemsList.findIndex(x=>x.id==this.id);
    this.itemsList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:ItemDTO){
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete item: "+data.name}
    });
  
    // listen to response
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.itemService.deleteItem(data).subscribe(res => {

          const index = this.itemsList.findIndex(x=>x.id==data.id);
          this.itemsList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }


}
