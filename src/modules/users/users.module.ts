import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { UsersUpsertComponent } from './users-upsert/users-upsert.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsResolver } from './user-details/user-details.resolver';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    { path: '', component: UsersListingComponent },
    { path: ':id', component: UserDetailsComponent, resolve: { user: UserDetailsResolver }}
];

@NgModule({
    declarations: [
        UsersListingComponent,
        UsersUpsertComponent,
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        NgbCollapseModule
    ],
    providers: [DatePipe]
})
export class UsersModule { }
