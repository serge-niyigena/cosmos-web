import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UsageStatusDTO } from '../dto/usage-status-dto';
import { UsageStatusService } from '../usage-status.service';

@Component({
  selector: 'app-usage-status',
  templateUrl: './usage-status.component.html',
  styleUrls: ['./usage-status.component.css']
})
export class UsageStatusComponent implements OnInit {

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

  usageStatusesList:UsageStatusDTO[];

  constructor(private fb: FormBuilder,private orgService:UsageStatusService,
    private notificationService:NotificationService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.getPaginatedUsageStatuses();
    
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]]
    });
    }


  update(data:UsageStatusDTO){
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


  private getPaginatedUsageStatuses(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getUsageStatusesList(params).subscribe(res => {
    this.usageStatusesList = res['content'];
  
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
    const org= new UsageStatusDTO(this.form.value);
    this.orgService.createUsageStatus(org).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.usageStatusesList?.unshift(res['content']);

    //this.usageStatusesList.push(res['content']);
    this.close();
    
    },
    error => {
  
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const org= new UsageStatusDTO(this.form.value);
   org.id=this.id;
    this.orgService.updateUsageStatus(org).subscribe(res => {

    const index = this.usageStatusesList.findIndex(x=>x.id==this.id);
    this.usageStatusesList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:UsageStatusDTO){
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
        this.orgService.deleteUsageStatus(data).subscribe(res => {

          const index = this.usageStatusesList.findIndex(x=>x.id==data.id);
          this.usageStatusesList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
