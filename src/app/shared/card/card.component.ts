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

  get isExpenseCategoryNull(): boolean {
    return this.subText === 'ExpenseCategory.null';
  }

  get isFooterTextNull(): boolean {
    return this.footerText === null;
  }

  ngOnInit(): void {
    console.log('Sub', this.subText);
  }
}
