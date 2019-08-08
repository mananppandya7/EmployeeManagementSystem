import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { DefaultService } from '../common/default.service';

@Component({
  selector: 'app-sidebarmenu',
  templateUrl: './sidebarmenu.component.html',
  styleUrls: ['./sidebarmenu.component.css']
})
export class SidebarmenuComponent implements OnInit {

  private pageHeaderStr: string ;
  constructor(private defaultService: DefaultService, private location: Location) { }

  ngOnInit() {
    this.pageHeaderStr = this.location.path().replace('/', '');

    if (this.pageHeaderStr.includes('/') === true)
      this.pageHeaderStr = this.pageHeaderStr.split('/')[0];

    this.pageHeaderStr = this.pageHeaderStr.charAt(0).toUpperCase() + this.pageHeaderStr.substring(1);
    this.onMenuClick(this.pageHeaderStr);
  }

  // For sidebar menu click event
  onMenuClick(pageHeader: string): void {
    this.defaultService.pageHeader(pageHeader);
  }
}
