import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // userActivated = false;
  // activatedSub: Subscription = new Subscription();

  // constructor(private userService: UserService) {}

  // ngOnInit() {
  //   this.activatedSub = this.userService.activatedEmitter.subscribe(
  //     (isActivated) => {
  //       this.userActivated = isActivated;
  //     }
  //   );
  // }

  // ngOnDestroy(): void {
  //   this.activatedSub.unsubscribe();
  // }

  
}
