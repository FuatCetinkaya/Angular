import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [MatTabsModule]
})
export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
