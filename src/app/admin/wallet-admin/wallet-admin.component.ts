import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { UserForAdmin } from 'src/app/_model/user_models/user-for-admin';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateInviteComponent } from 'src/app/invites/create-invite/create-invite.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseForAdminTable } from 'src/app/_model/expense_models/expense-for-admin-table';
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
  constructor(
    private admService: AdminService,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private adminService: AdminService,
    public translate: TranslateService,
    private titleService: Title,
    private walletService: WalletService
  ) {}

  columnsForExpenses: string[] = [
    'expenseTitle',
    'category',
    'userName',
    'moneySpent',
    'expenseDescription',
    'creationDate',
    'actions'
  ];
  columnsForUsers: string[] = [
    'username',
    'dateJoined',
    'userRoles',
    'actions'
  ];
  expenses: ExpenseForAdminTable[] = [];
  users = new MatTableDataSource<UserForAdmin>();
  walletCurrency = 'USD';
  isLoading = false;

  @ViewChild('expPaginator') expensePaginator: MatPaginator;
  ngOnInit(): void {
    this.getCurrency();
    this.setLanguage();
    this.getExpenses();
    this.getUsers();
  }
  private getUsers() {
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users.data = usersForAdmin;
    });
  }

  private getExpenses() {
    this.admService
      .getAllExpenses()
      .subscribe((expenses: ExpenseForAdminTable[]) => {
        this.isLoading = true;
        this.expenses = expenses;
        console.log(expenses);
        //this.expenses.paginator = this.expensePaginator;
        this.isLoading = false;
      });
  }

  private setLanguage() {
    if (this.translate.currentLang === 'en') {
      moment.locale('en');
    } else if (this.translate.currentLang === 'ru') moment.locale('ru');

    this.translate.onLangChange.subscribe(() => {
      if (this.translate.currentLang === 'en') {
        moment.locale('en');
      } else if (this.translate.currentLang === 'ru') moment.locale('ru');
    });
    this.setTitle(this.translate.currentLang);
    this.translate.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  private getCurrency() {
    this.walletService.getCurrentWallet().subscribe((wallet) => {
      this.walletCurrency = wallet['currency'];
    });
  }

  setTitle(lang: string): void {
    if (lang === 'en') {
      this.titleService.setTitle('Admin panel');
    } else if (lang === 'ru') {
      this.titleService.setTitle('Админ Панель');
    }
  }

  removeUser(userId: string, rowIndex: number): void {
    confirm(
      this.translate.currentLang === 'en'
        ? 'Do you really want to remove this user from your wallet?'
        : 'Вы действительно хотите убрать этого пользователя из Вашего кошелька?'
    );
    this.admService.removeUser(userId).subscribe(
      (response) => {
        this.users.data.splice(rowIndex, 1);
        this.alertify.success(response);
        this.users.data = this.users.data;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  sendInvitation(): void {
    const dialogRef = this.dialog.open(CreateInviteComponent);
    dialogRef.afterClosed().subscribe();
  }

  // openDialog(id: number, rowIndex: number): void {
  //   var exp = this.expenses.data.find(x => x.id === id);
  //   exp.isAdmin = true;
  //   const dialogRef = this.dialog.open(EditExpenseModalComponent, {
  //     width: '550px',
  //     data: exp
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined && result !== null) {
  //       this.expenses.data[rowIndex].expenseTitle = result['expenseTitle'];
  //       this.expenses.data[rowIndex].expenseDescription = result['expenseDescription'];
  //       this.expenses.data[rowIndex].moneySpent = result['moneySpent'];
  //       this.expenses.data[rowIndex].creationDate = result['creationDate'];
  //     }
  //   });
  // }

  onWalletEditDialog(): void {
    const dialogRef = this.dialog.open(EditWalletComponent);
    dialogRef.afterClosed().subscribe();
  }

  // expenseDelete(id: number, rowIndex: number, elem: any) {
  //   let deleteConfirmation = confirm(this.translate.currentLang === 'en' ? "Do you really want to delete this expense?" : "Вы действительно хотите удалить этот расход?");
  //   if (deleteConfirmation) {
  //     this.adminService.onExpenseDelete(id).subscribe((response: any) => {
  //       this.alertify.success(response);
  //       let indexOfItemToDelete = this.expenses.data.indexOf(elem);
  //       this.expenses.data.splice(indexOfItemToDelete, 1);
  //       this.expenses.data = this.expenses.data;
  //     }, error => {
  //       this.alertify.error(error.error);
  //     });
  //   }
  // }

  addUserFromRequest(): void {
    this.admService.getUsers().subscribe((usersForAdmin: UserForAdmin[]) => {
      this.users.data = usersForAdmin;
    });
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}
