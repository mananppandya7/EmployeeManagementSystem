import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefaultService } from '../common/default.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  pageHeader: string;
  private subscription: Subscription;

  constructor(private defaultService: DefaultService, private title: Title) {
    this.pageHeader = this.defaultService.loadDynamicHeader();
    this.title.setTitle('EMS-' + this.pageHeader);
  }

  ngOnInit() {
    this.subscription = this.defaultService.pageHeaderChanged.subscribe(header => {
      if (header) {
        this.pageHeader = header;
      } else {
        // Clear page header (e.g. Dashboard, Employee) if empty header received
        this.pageHeader = null;
      }
    });
  }

  //For destroy subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
