import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetailsModel } from 'src/models/user/UserDetailsModel';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user!: UserDetailsModel;
  isCollapsed = false;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const activatedRouteSubscription = this.activatedRoute.data.subscribe(({ user }) => {
      debugger
      this.user = user.data;
      console.log(this.user);
      
    });
    this.subscriptions.push(activatedRouteSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscribe) => subscribe.unsubscribe());
  }
}
