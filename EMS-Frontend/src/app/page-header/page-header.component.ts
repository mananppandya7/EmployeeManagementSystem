import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { DefaultService } from '../common/default.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  //#region VARIABLES
  pageHeader: string;
  private subscription: Subscription;
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private defaultService: DefaultService, private title: Title) { }
  //#endregion

  //#region EVENTS & METHODS
  ngOnInit() {
    this.subscription = this.defaultService.pageHeaderChanged.subscribe(header => {
      if (header) {
        this.pageHeader = header;
      } else {
        // Set default header to 'Dashboard'
        this.pageHeader = 'Dashboard';
      }
      // Set title
      this.title.setTitle('EMS-' + this.pageHeader);
    });
  }

  // Destroy subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  //#endregion
}
