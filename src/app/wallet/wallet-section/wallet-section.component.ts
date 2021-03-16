/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import * as AOS from 'aos';
@Component({
  selector: 'app-wallet-section',
  templateUrl: './wallet-section.component.html',
  styleUrls: ['./wallet-section.component.css']
})
export class WalletSectionComponent {
  @ViewChild('drawer', { static: false }) drawer;
  toggleState = false;

  onToggle($event): void {
    this.drawer.toggle();
    this.toggleState = !this.toggleState;
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {}

  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  ngAfterViewInit(): void {
    this.sidenavContainer.scrollable
      .elementScrolled()
      .subscribe(() => AOS.refresh());
  }
}
