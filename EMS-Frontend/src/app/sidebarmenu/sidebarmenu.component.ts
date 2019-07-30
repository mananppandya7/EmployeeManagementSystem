import { Component, OnInit } from '@angular/core';
import { DefaultService } from '../common/default.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebarmenu',
  templateUrl: './sidebarmenu.component.html',
  styleUrls: ['./sidebarmenu.component.css']
})
export class SidebarmenuComponent implements OnInit {

  constructor(private defaultService: DefaultService, private title: Title) { }

  ngOnInit() {

  }

  onMenuClick(pageHeader: string): void {

    this.defaultService.pageHeader(pageHeader);

    //For title
    let titleHeader = 'EMS-' + pageHeader;
    this.title.setTitle(titleHeader);
  }

}
