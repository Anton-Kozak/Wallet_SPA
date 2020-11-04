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
import * as moment from 'moment';
import { WalletService } from 'src/app/_services/wallet.service';
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
    public translate: TranslateService, private titleService: Title, private walletService: WalletService) {
  }

  columnsForExpenses: string[] = ['expenseTitle', 'category', 'userName', 'moneySpent', 'expenseDescription', 'creationDate', 'actions'];
  columnsForUsers: string[] = ['username', 'dateJoined', 'userRoles', 'actions'];
  expenses = new MatTableDataSource<ExpenseForAdminTable>();
  users = new MatTableDataSource<UserForAdmin>();
  walletCurrency: string = 'USD';

  @ViewChild('expPaginator') expensePaginator: MatPaginator;
  ngOnInit(): void {
    this.walletService.getCurrentWallet().subscribe(wallet => {
      this.walletCurrency = wallet['currency'];
    })
    if (this.translate.currentLang === 'en') {
      moment.locale('en');
    }
    else if (this.translate.currentLang === 'ru')
      moment.locale('ru');

    this.translate.onLangChange.subscribe(() => {
      if (this.translate.currentLang === 'en') {
        moment.locale('en');
      }
      else if (this.translate.currentLang === 'ru')
        moment.locale('ru');
    })

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
    let res = confirm(this.translate.currentLang === 'en' ? "Do you really want to remove this user from your wallet?" : "Вы действительно хотите убрать этого пользователя из Вашего кошелька?")
    this.admService.removeUser(userId).subscribe(response => {
      this.users.data.splice(rowIndex, 1);
      this.alertify.success(response);
      this.users.data = this.users.data;
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
    });
  }

  expenseDelete(id: number, rowIndex: number, elem: any) {
    let deleteConfirmation = confirm(this.translate.currentLang === 'en' ? "Do you really want to delete this expense?" : "Вы действительно хотите удалить этот расход?");
    if (deleteConfirmation) {
      this.adminService.onExpenseDelete(id).subscribe((response: any) => {
        this.alertify.success(response);
        let indexOfItemToDelete = this.expenses.data.indexOf(elem);
        this.expenses.data.splice(indexOfItemToDelete, 1);
        this.expenses.data = this.expenses.data;
      }, error => {
        this.alertify.error(error.error);
      });
    }
  }

  addUserFromRequest($event) {
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users.data = usersForAdmin;
    });
  }

  getFormat(date) {
    return moment(date).format('lll');
  }

}
