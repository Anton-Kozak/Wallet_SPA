import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wallet-section',
  templateUrl: './wallet-section.component.html',
  styleUrls: ['./wallet-section.component.css']
})
export class WalletSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild("drawer", { static: false }) drawer;
  toggleState = false;


  onToggle($event) {
    this.drawer.toggle();
    this.toggleState = !this.toggleState;
  }


}
