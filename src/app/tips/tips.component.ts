import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  tips: { title: string, tip: string }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/tips.json').subscribe(tips => {
      for (const key in tips['Tips']) {
        this.tips.push({ title: key, tip: tips['Tips'][key] });
      }
      console.log(this.tips);
    })


  }

}
