import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UserTypeDTO } from '../../dto/user-type-dto';
import { UserTypeService } from '../../user-type.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {

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

  userTypesList:UserTypeDTO[];

  constructor(private fb: FormBuilder,private orgService:UserTypeService,
    private notificationService:NotificationService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.getPaginatedUserTypees();
    
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]]
    });
    }


  update(data:UserTypeDTO){
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


  private getPaginatedUserTypees(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getUserTypesList(params,).subscribe(res => {
    this.userTypesList = res['content']['data'];
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
    const org= new UserTypeDTO(this.form.value);
    this.orgService.createUserType(org).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.userTypesList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.userTypesList.push(res['content']);
    this.close();
    
    },
    error => {
      console.log(error)
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const org= new UserTypeDTO(this.form.value);
   
    this.orgService.updateUserType(org,this.id).subscribe(res => {

    const index = this.userTypesList.findIndex(x=>x.id==this.id);
    this.userTypesList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:UserTypeDTO){
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
        this.orgService.deleteUserType(data.id).subscribe(res => {

          const index = this.userTypesList.findIndex(x=>x.id==data.id);
          this.userTypesList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }


}
