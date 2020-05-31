import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WalletsSPA';
  @ViewChild("drawer", { static: false }) drawer;
  constructor(public dialog: MatDialog) {

  }

  onToggle($event) {

    this.drawer.toggle();
  }

  createExpenseShow($event) {
    const dialogRef = this.dialog.open(CreateExpenseComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }
}
