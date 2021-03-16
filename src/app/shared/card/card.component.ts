import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input('classes') classes: string[] = [];
  @Input('mainText') mainText = '';
  @Input('subText') subText = '';
  @Input('subTextNone') subTextNone = '';
  @Input('hasFooter') hasFooter: boolean;
  @Input('footerText') footerText = '';
  @Input('footerTextNone') footerTextNone = '';

  ngOnInit(): void {
    console.log('Sub', this.subText);
  }
}
