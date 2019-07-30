import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DefaultService } from '../common/default.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  breadcrumb: string = null;
  private subscription: Subscription;

  constructor(private defaultService: DefaultService) { }

  ngOnInit() {

    this.subscription = this.defaultService.pageHeaderChanged.subscribe(breadcrumb => {
      if (breadcrumb !== 'Dashboard')
        this.breadcrumb = breadcrumb;
      else
        this.breadcrumb = null;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
