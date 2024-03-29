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
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { Roles } from 'src/app/_helper/roles';
import { ColumnHeaders } from 'src/app/_helper/columns-headers';
import { Language } from 'src/app/_helper/language';
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
    ColumnHeaders.Title,
    ColumnHeaders.Category,
    ColumnHeaders.UserName,
    ColumnHeaders.MoneySpent,
    ColumnHeaders.Description,
    ColumnHeaders.Date,
    ColumnHeaders.Actions
  ];
  columnsForUsers: string[] = [
    ColumnHeaders.Username,
    ColumnHeaders.DateJoined,
    ColumnHeaders.UserRoles,
    ColumnHeaders.Actions
  ];
  expenses: ExpenseForAdminTable[] = [];
  users = new MatTableDataSource<UserForAdmin>();
  walletCurrency = 'USD';
  isLoading = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  get isLengthNotNill(): boolean {
    return !!this.expenses.length;
  }

  @ViewChild('expPaginator') expensePaginator: MatPaginator;
  ngOnInit(): void {
    this.getCurrency();
    this.setLanguage();
    this.getExpenses();
    this.getUsers();
  }
  private getUsers() {
    this.admService.getUsers().subscribe(
      (usersForAdmin: UserForAdmin[]) => {
        this.users.data = usersForAdmin;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private getExpenses() {
    this.admService.getAllExpenses().subscribe(
      (expenses: ExpenseForAdminTable[]) => {
        this.isLoading = true;
        this.expenses = [...expenses];
        this.isLoading = false;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private setLanguage() {
    if (this.translate.currentLang === Language.English) {
      moment.locale(Language.English);
    } else if (this.translate.currentLang === Language.Russian)
      moment.locale(Language.Russian);

    this.translate.onLangChange.subscribe(() => {
      if (this.translate.currentLang === Language.English) {
        moment.locale(Language.English);
      } else if (this.translate.currentLang === Language.Russian)
        moment.locale(Language.Russian);
    });
    this.setTitle(this.translate.currentLang);
    this.translate.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  private getCurrency() {
    this.walletService.getCurrentWallet().subscribe(
      (wallet) => {
        this.walletCurrency = wallet['currency'];
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Admin panel');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Админ Панель');
    }
  }

  removeUser(userId: string, rowIndex: number): void {
    const res = confirm(
      this.translate.currentLang === Language.English
        ? 'Do you really want to remove this user from your wallet?'
        : 'Вы действительно хотите убрать этого пользователя из Вашего кошелька?'
    );
    if (res)
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

  onWalletEditDialog(): void {
    const dialogRef = this.dialog.open(EditWalletComponent);
    dialogRef.afterClosed().subscribe();
  }

  addUserFromRequest(): void {
    this.admService.getUsers().subscribe(
      (usersForAdmin: UserForAdmin[]) => {
        this.users.data = usersForAdmin;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  makeUserPremium(user: UserForAdmin, index: number): void {
    const res = confirm('Do you really want to add premium status?');
    if (res)
      this.adminService.makeUserPremium(user.id).subscribe(
        (res) => {
          console.log(
            `${res} - now ${user.username} can do anything he/she wants!!!`
          );
        },
        (error) => {
          console.log(error.error);
        },
        () => {
          this.addRole(Roles.Premium, index);
        }
      );
  }

  removePremiumStatus(user: UserForAdmin, index: number): void {
    const res = confirm('Do you really want to remove premium status?');
    if (res)
      this.adminService.removePremiumStatus(user.id).subscribe(
        () => {
          console.log(`${user.username} is now a peasant!`);
        },
        (error) => {
          console.log(error.error);
        },
        () => {
          this.removeRole(Roles.Premium, index);
        }
      );
  }

  blockUser(user: UserForAdmin, index: number): void {
    const res = confirm('Do you really want to block this user?');
    if (res && user.userRoles.find((u) => u === Roles.Admin) === undefined)
      this.adminService.blockUser(user.id).subscribe(
        () => {
          console.log(`${user.username} is now blocked!`);
        },
        (error) => {
          console.log(error.error);
        },
        () => {
          this.addRole(Roles.Blocked, index);
        }
      );
  }
  unblockUser(user: UserForAdmin, index: number): void {
    const res = confirm('Do you really want to unblock this user?');
    if (res && user.userRoles.find((u) => u === Roles.Admin) === undefined)
      this.adminService.unblockUser(user.id).subscribe(
        () => {
          console.log(`${user.username} is now unblocked!`);
        },
        (error) => {
          console.log(error.error);
        },
        () => {
          this.removeRole(Roles.Blocked, index);
        }
      );
  }

  editUser(user: UserForAdmin): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      width: '850px',
      data: user
    });
    dialogRef.afterClosed().subscribe();
  }

  isInRole(user: UserForAdmin, role: string): boolean {
    return user.userRoles.includes(role);
  }

  private addRole(role: string, index: number): void {
    if (role === Roles.Premium || role === Roles.Blocked) {
      const users = this.users.data[index];
      users.userRoles.push(role);
      this.users.data[index] = { ...users };
      this.users.data = this.users.data;
    }
  }
  private removeRole(role: string, index: number): void {
    if (role === Roles.Premium || role === Roles.Blocked) {
      const users = this.users.data[index];
      const indexToSplice = users.userRoles.findIndex((u) => u === role);
      users.userRoles.splice(indexToSplice, 1);
      this.users.data[index] = { ...users };
      this.users.data = this.users.data;
    }
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}
