import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { OrgDTO } from '../dto/org-dto';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'mobile', 'email', 'physical address', 'postal address','action'];
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

  org=new OrgDTO(Object);

  orgList:OrgDTO[];

  constructor(private fb: FormBuilder,private orgService:OrganizationService,
    private notificationService:NotificationService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.getPaginatedOrganizations();
    
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        mobileNumber: ['', [Validators.required]],
        postalAddress: ['', [Validators.required]],
        physicalAddress: ['', [Validators.required]],
    });
    }


  update(data:OrgDTO){
    this.form.patchValue({
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      postalAddress: data.postalAddress,
      physicalAddress: data.physicalAddress
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


  private getPaginatedOrganizations(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getOrganizationsList(params,).subscribe(res => {
    this.orgList = res['content']['data'];
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
    const org= new OrgDTO(this.form.value);
    this.orgService.createOrganization(org).subscribe(res => {
    this.notificationService.openSnackBar(res['message']);
    
    this.orgList.unshift(res['content']);
    this.paginator.pageSize= this.pageInfo.pageSize;

    //this.orgList.push(res['content']);
    this.close();
    
    },
    error => {
      console.log(error)
      this.notificationService.openSnackBar(error.error.message);
  
  }
    );
  }

  if(this.id!==0){
    const org= new OrgDTO(this.form.value);
   
    this.orgService.updateOrganization(org,this.id).subscribe(res => {

    const index = this.orgList.findIndex(x=>x.id==this.id);
    this.orgList.splice(index,1,res['content']);
    this.notificationService.openSnackBar(res['message']);
    this.close();
    });
  }
  }

  delete(data:OrgDTO){
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
        this.orgService.deleteOrganization(data.id).subscribe(res => {

          const index = this.orgList.findIndex(x=>x.id==data.id);
          this.orgList.splice(index,1);
          this.notificationService.openSnackBar(res['message']);
          this.close();
      });
    }
      
   });
  
  }

}
