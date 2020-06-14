import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { UserForAdmin } from 'src/app/_model/user-for-admin';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateInviteComponent } from 'src/app/invites/create-invite/create-invite.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseForAdminTable } from 'src/app/_model/expense-for-admin-table';


@Component({
  selector: 'app-wallet-admin',
  templateUrl: './wallet-admin.component.html',
  styleUrls: ['./wallet-admin.component.css']
})
export class WalletAdminComponent implements OnInit {

  //TODO: перекинуть таблицу с пользователями на страницу edit-wallet
  constructor(private admService: AdminService,
    public dialog: MatDialog,
    private alertify: AlertifyService) { }

  displayedColumns: string[] = ['expenseTitle', 'category', 'userName', 'moneySpent', 'expenseDescription', 'creationDate'];
  dataSource = new MatTableDataSource<ExpenseForAdminTable>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  users: UserForAdmin[] = [];
  ngOnInit(): void {
    this.admService.getAllExpenses().subscribe((expenses: ExpenseForAdminTable[])=>{
      this.dataSource.data = expenses;
    })
    this.dataSource.paginator = this.paginator;
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users = usersForAdmin;
    })
  }

  removeUser(userId: string, rowIndex: number) {
    this.admService.removeUser(userId).subscribe(response => {
      this.alertify.success(response);
      var el: any = (document.getElementById(rowIndex.toString())) as HTMLTableElement;
      el.remove(rowIndex);
    }, error => {
      this.alertify.error(error.error);
    });
  }

  sendInvitation() {
    const dialogRef = this.dialog.open(CreateInviteComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
