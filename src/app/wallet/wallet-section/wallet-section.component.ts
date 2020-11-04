import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import * as AOS from 'aos';
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

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
  }

  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  ngAfterViewInit() {
    this.sidenavContainer.scrollable.elementScrolled().subscribe(() => AOS.refresh());
  }


}
