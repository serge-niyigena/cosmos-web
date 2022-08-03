import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PageInfo } from 'src/app/core/dtos/page-info';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Utilities } from 'src/app/core/utilities';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { RoleDTO } from '../dto/role-dto';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-typography',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {


  displayedColumns: string[] = ['name', 'desc'];
  @ViewChild('myTable') myTable: MatTable<any>; 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;
  searchValue:string;
  page:number=0;
  pageSize:number=10;
  sortDirection:string="desc";
  id:number=0;
  
  pageInfo:PageInfo;

  rolesList:RoleDTO[];

  constructor(private fb: FormBuilder,private orgService:RoleService,
    private notificationService:NotificationService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.getPaginatedRoles();
    
  }


  initiateForm(){
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        desc: ['', [Validators.required]]
    });
    }

    handlePageEvent(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.getPaginatedRoles();
    }
  

  private getPaginatedRoles(){

    const params=Utilities.getRequestParams(this.searchValue,this.page,this.pageSize,this.sortDirection);
    this.orgService.getRolesList(params,).subscribe(res => {
    this.rolesList = res['content']['data'];
    this.pageInfo= res['content']['pageInfo'];
    this.paginator.pageSize=this.pageInfo.pageSize;
    this.paginator.pageIndex=this.pageInfo.pageNumber;
    this.paginator.length=this.pageInfo.totalResults;
  
  });
  }

  close(){
    this.dialog.closeAll();
    this.myTable.renderRows();
    this.initiateForm();
    this.id=0;
  }
}
