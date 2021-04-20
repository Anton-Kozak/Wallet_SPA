import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
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
import {
  combineLatest,
  concat,
  forkJoin,
  fromEvent,
  interval,
  merge,
  Observable,
  of,
  race,
  range,
  Subject,
  zip
} from 'rxjs';
import {
  concatAll,
  concatMap,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Filters } from 'src/app/_model/expense_models/fitlers';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-wallet-admin',
  templateUrl: './wallet-admin.component.html',
  styleUrls: ['./wallet-admin.component.css']
})
export class WalletAdminComponent implements OnInit, AfterViewInit {
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
  expensesFiltered: ExpenseForAdminTable[] = [];
  users = new MatTableDataSource<UserForAdmin>();
  usersNames: string[];
  userRoles: string[] = [];
  walletCurrency = 'USD';
  isLoading = false;

  userStream$ = new Subject<string>();
  priceStream$ = new Subject<string>();
  dateStream$ = new Subject<string>();
  mainObservable$ = new Observable<Filters>();
  @ViewChild('userFilterRef') userFilterRef: ElementRef;
  @ViewChild('priceFilterRef') priceFilterRef: ElementRef;
  @ViewChild('anotherFilterRef') anotherFilterRef: ElementRef;

  filterDate: FormControl;
  get isLengthNotNill(): boolean {
    return !!this.expenses.length;
  }
  get isExpensesFilteredLengthNotNill(): boolean {
    return !!this.expensesFiltered.length;
  }

  @ViewChild('expPaginator') expensePaginator: MatPaginator;
  ngOnInit(): void {
    this.getCurrency();
    this.setLanguage();
    this.getExpenses();
    this.getUsers();
    this.filterDate = new FormControl(new Date().toDateString());
  }

  ngAfterViewInit(): void {
    this.subscribeStreams();
    this.setFilterStreams();
  }
  private setFilterStreams(): void {
    this.userStream$.next(this.userFilterRef.nativeElement.value);
    this.priceStream$.next(this.priceFilterRef.nativeElement.value);
    this.dateStream$.next('No date');
  }

  private getUsers() {
    this.admService.getUsers().subscribe(
      (usersForAdmin: UserForAdmin[]) => {
        this.usersNames = usersForAdmin.map((user) => user.username);
        this.users.data = usersForAdmin;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private subscribeStreams(): void {
    this.mainObservable$
      .pipe(
        () =>
          combineLatest([
            this.userStream$,
            this.priceStream$,
            this.dateStream$
          ]),
        switchMap((filters: string[]) => {
          const fil: Filters = {
            nameFilter: filters[0],
            priceFilter: +filters[1],
            dateFilter: new Date(filters[2])
          };
          return this.getExpensesDataFiltered(fil);
        })
      )
      .subscribe((filteredExpenses: ExpenseForAdminTable[]) => {
        this.expensesFiltered = filteredExpenses;
      });
  }

  //fork join won't work as it needs all observables to be completed

  onFilterChange(stream: string, value: string): void {
    switch (stream) {
      case 'users':
        this.userStream$.next(value);
        break;
      case 'price':
        this.priceStream$.next(value);
        break;
      case 'date':
        console.log('date changed', value);

        this.dateStream$.next(value);
        break;
      default:
        alert('Error');
        break;
    }
  }

  private getExpensesDataFiltered(
    filters: Filters
  ): Observable<ExpenseForAdminTable[]> {
    return this.adminService.getExpensesDataFiltered(filters);
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

  structureRoles(roles: string[]): string[] {
    const structuredRoles: string[] = [];
    roles.map((role) => {
      this.translate.get(`Roles.${role}`).subscribe((value) => {
        structuredRoles.push(' ' + value);
      });
    });
    return structuredRoles;
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }

  //-------------------------------------------------------RXJS TESTING-------------------------------------------------------
  stream1$ = new Subject<string>();
  stream2$ = new Subject<string>();
  stream3$ = new Subject<string>();
  concatObservable$ = new Observable();
  concatLowerObservable$ = new Observable();

  mergeStream1$ = new Subject<string>();
  mergeStream2$ = new Subject<string>();
  mergeStream3$ = new Subject<string>();
  mergeObservable$ = new Observable();
  //merge - merge all observables into one regardless of the order
  onMergeTest() {
    setTimeout(() => {
      this.mergeStream1$.next('Hello');
    }, 5000);
    setTimeout(() => {
      this.mergeStream2$.next('world');
      this.mergeStream2$.complete();
    }, 3000);
    setTimeout(() => {
      this.mergeStream3$.next('1');
      this.mergeStream3$.complete();
    }, 1000);
    setTimeout(() => {
      this.mergeStream1$.next('Hello');
      this.mergeStream1$.complete();
    }, 10000);
    const merged = merge(
      this.mergeStream3$,
      this.mergeStream2$,
      this.mergeStream1$
    );
    merged.subscribe(
      (x) => console.log(x),
      () => {
        console.log('error');
      },
      () => {
        console.log('Complete');
      }
    );
  }
  //concat - unites all into one observable considering the order. Each stream should complete before switching to the next!
  onConcatTest() {
    setTimeout(() => {
      this.stream1$.next('Hello');
      this.stream1$.complete();
    }, 5000);
    setTimeout(() => {
      this.stream2$.next('world');
      this.stream2$.complete();
    }, 2000);
    setTimeout(() => {
      this.stream3$.next('1');
      this.stream3$.complete();
    }, 1000);
    const result = concat(this.stream3$, this.stream2$, this.stream1$);
    result.subscribe((x) => console.log(x));
  }
  //forkJoin - once every inner observables are complete, returns the result combination of all observables. Only the last values are going to be returned
  onForkJoinTest() {
    setTimeout(() => {
      this.stream1$.next('Hello');
      this.stream1$.complete();
    }, 5000);
    setTimeout(() => {
      this.stream2$.next('world');
      this.stream2$.complete();
    }, 2000);
    setTimeout(() => {
      this.stream3$.next('1');
      this.stream3$.complete();
    }, 1000);
    const result = forkJoin([this.stream1$, this.stream2$, this.stream3$]);
    result.subscribe((res) => console.log(res));
  }
  //whichever is the fastest that remains subscribed
  onRaceTest() {
    const obs1 = interval(1000).pipe(mapTo('fast one'));
    const obs2 = interval(3000).pipe(mapTo('medium one'));
    const obs3 = interval(5000).pipe(mapTo('slow one'));
    race(obs3, obs1, obs2).subscribe((winner) => console.log(winner));
  }
  //если у нас есть поток который возвращает не значения, а observables, мы через mergeAll может значения этих observables получить
  onMergeAllTest() {
    // const int$ = interval(1000).pipe(
    //   take(2),
    //   map((int) => interval(500).pipe(take(3)), mergeAll())
    // );
    // int$.subscribe((val) => console.log(val));
    // const int$ = interval(1000).pipe(
    //   take(2),
    //   mergeMap((int) => interval(500).pipe(take(3)))
    // );
    // int$.subscribe(console.log);

    // const clicks = fromEvent(document, 'click');
    // const higherOrder = clicks.pipe(map((ev) => interval(1000)));
    // const firstOrder = higherOrder.pipe(mergeAll());
    // firstOrder.subscribe((x) => console.log(x));

    const letters = fromEvent(document, 'click');
    const result = letters.pipe(
      mergeMap((x) => interval(1000).pipe(map((i) => interval(1000))))
    );
    result.subscribe((x) => console.log(x));
  }
  //принимает значение observables, применяет к ним функцию, и возвращает значение, которые собираются в observable
  onMergeMapTest() {
    // const obs1 = interval(1000).pipe(mapTo('1 one'));
    // const obs2 = interval(3000).pipe(mapTo('2 one'));
    // const obs3 = interval(5000).pipe(mapTo('3 one'));
    // this.mergeObservable$.pipe(mergeMap());
    // race(obs3, obs1, obs2).subscribe((winner) => console.log(winner));
  }
  //ждет пока все значения буду emitted из observables и только потом выдает результат
  onZipTest() {
    // const age$ = of<number>(27, 25, 29);
    // const name$ = of<string>('Foo', 'Bar', 'Beer');
    // const isDev$ = of<boolean>(true, true, false);
    // zip(age$, name$, isDev$)
    //   .pipe(map(([age, name, isDev]) => ({ age, name, isDev })))
    //   .subscribe((x) => console.log(x));
    const obs$ = interval(1000);
    const obs2$ = interval(3000);
    zip(obs$, obs2$)
      .pipe(tap((val) => console.log(val)))
      .subscribe();
  }
  //return new value only when guiding stream (obs2) emits something
  onWithLatestFromTest() {
    const obs$ = interval(500);
    const obs2$ = interval(1000).pipe(take(10));
    obs2$.pipe(withLatestFrom(obs$)).subscribe((x) => console.log(x));
  }
}
