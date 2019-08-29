import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';

import { DefaultService } from './common/default.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked  {

  //#region VARIABLES
  isLogin: boolean = true;
  //#endregion

  //#region CONSTRUCTOR
  constructor(private defaultService: DefaultService, private changeDetector: ChangeDetectorRef) { }
  //#endregion

  //#region EVENTS & METHODS
   ngOnInit() {
    this.defaultService.logIn.subscribe(res => {
      this.isLogin = res;
    });
  }

  /* A callback method that is invoked immediately after the default change detector has completed checking all of the directive's content.  
   * I used it to prevent console error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
   *                                     Previous value: 'ngIf: true'. Current value: 'ngIf: false'.
   * 
   * To re-produce this error, perform below steps:
   *  1. Comment below lifecycle hook
   *  2. Log-In to application
   *  3. Log-Out from application so user will be redirected to Dashboard
   *  4. Click Log-In OR Authentication and check console error */
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  //#endregion
}
