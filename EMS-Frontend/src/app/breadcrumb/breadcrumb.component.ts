import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DefaultService } from '../common/default.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  //#region VARIABLES
  breadcrumb: string = null;
  private subscription: Subscription;
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private defaultService: DefaultService) { }
  //#endregion

  //#region EVENTS & METHODS
  ngOnInit() {
    this.subscription = this.defaultService.pageHeaderChanged.subscribe(breadcrumb => {
      if (breadcrumb !== 'Dashboard')
        this.breadcrumb = breadcrumb === '' ? null : breadcrumb;
      else
        this.breadcrumb = null;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  //#endregion
}
