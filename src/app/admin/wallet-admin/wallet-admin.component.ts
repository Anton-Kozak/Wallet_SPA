import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { UserForAdmin } from 'src/app/_model/user-for-admin';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateInviteComponent } from 'src/app/invites/create-invite/create-invite.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseForAdminTable } from 'src/app/_model/expense-for-admin-table';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';
import { EditWalletComponent } from 'src/app/wallet/edit-wallet/edit-wallet.component';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-wallet-admin',
  templateUrl: './wallet-admin.component.html',
  styleUrls: ['./wallet-admin.component.css']
})
export class WalletAdminComponent implements OnInit {

  //TODO: перекинуть таблицу с пользователями на страницу edit-wallet
  constructor(private admService: AdminService,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private adminService: AdminService,
    public translate: TranslateService, private titleService: Title) {
  }

  columnsForExpenses: string[] = ['expenseTitle', 'category', 'userName', 'moneySpent', 'expenseDescription', 'creationDate', 'actions'];
  columnsForUsers: string[] = ['username', 'dateJoined', 'userRoles', 'actions'];
  expenses = new MatTableDataSource<ExpenseForAdminTable>();
  users = new MatTableDataSource<UserForAdmin>();

  @ViewChild('expPaginator') expensePaginator: MatPaginator;
  ngOnInit(): void {
    this.admService.getAllExpenses().subscribe((expenses: ExpenseForAdminTable[]) => {
      this.expenses.data = expenses;
      this.expenses.paginator = this.expensePaginator;

    })
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users.data = usersForAdmin;
    });
    this.setTitle(this.translate.currentLang);
    this.translate.onLangChange.subscribe(lang => {
      this.setTitle(lang['lang']);
    });

  }
  setTitle(lang: string) {
    if (lang === 'en') {
      this.titleService.setTitle('Admin panel');
    }
    else if (lang === 'ru') {
      this.titleService.setTitle('Админ Панель');
    }
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

  openDialog(id: number, rowIndex: number): void {
    var exp = this.expenses.data.find(x => x.id === id);
    exp.isAdmin = true;
    const dialogRef = this.dialog.open(EditExpenseModalComponent, {
      width: '550px',
      data: exp
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.expenses.data[rowIndex].expenseTitle = result['expenseTitle'];
        this.expenses.data[rowIndex].expenseDescription = result['expenseDescription'];
        this.expenses.data[rowIndex].moneySpent = result['moneySpent'];
        this.expenses.data[rowIndex].creationDate = result['creationDate'];
      }
    });
  }


  onWalletEditDialog() {
    const dialogRef = this.dialog.open(EditWalletComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  expenseDelete(id: number, rowIndex: number) {
    this.adminService.onExpenseDelete(id).subscribe((response: any) => {
      this.alertify.success(response);
      this.expenses.data.splice(rowIndex, 1);
      this.expenses.data = this.expenses.data;
    }, error => {
      this.alertify.error(error.error);
    });
  }

  addUserFromRequest($event) {
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users.data = usersForAdmin;
    });
  }

}
