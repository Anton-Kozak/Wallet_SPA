import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WalletsSPA';
  @ViewChild("drawer", { static: false }) drawer;


  onToggle($event) {

    this.drawer.toggle();
  }

}
