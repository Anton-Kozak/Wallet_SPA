import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('classes') classes: string[] = [];
  @Input('mainText') mainText: string = '';
  @Input('subText') subText: string = '';
  @Input('subTextNone') subTextNone: string = '';
  @Input('hasFooter') hasFooter: boolean;
  @Input('footerText') footerText: string = '';
  @Input('footerTextNone') footerTextNone: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log('Sub', this.subText);
    
  }

}
