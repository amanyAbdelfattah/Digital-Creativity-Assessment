import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-actions',
  template:`
    <button *ngFor="let gridCustomButton of params.gridCustomButtons" class="btn btn-sm mb-1 me-2" (click)="OnActionClick($event, gridCustomButton.action)" [title]="gridCustomButton.title" [ngClass]="gridCustomButton.btnClass == undefined ? 'btn-secondary' : gridCustomButton.btnClass">
      <i *ngIf="gridCustomButton.iconClass" [ngClass]="gridCustomButton.iconClass" class="fa" aria-hidden="true"></i>
      <ng-container *ngIf="gridCustomButton.text">{{gridCustomButton.text}}</ng-container>
    </button>
    <button *ngIf="params.canView" class="btn btn-primary btn-sm text-white mb-1 me-2" (click)="OnActionClick($event, 'View')" title="View"><i class='fa fa-eye'></i></button>
    <button *ngIf="params.canEdit" class="btn btn-warning btn-sm text-white mb-1 me-2" (click)="OnActionClick($event, 'Edit')" title="Edit"><i class='fa fa-pencil'></i></button>
    <button title="{{params.data.active ? 'Deactivate' : 'Activate'}}" *ngIf="params.canDeactivate" class="btn btn-sm mb-1 me-2" [ngClass]="{'btn-danger': params.data.active === 'True', 'btn-success': params.data.active === 'False'}" (click)="OnActionClick($event, 'ToggleActive')">
      <i class='fa' [ngClass]="{'fa-ban': params.data.active === 'True', 'fa-check-circle-o': params.data.active === 'False'}"></i>
    </button>
    <button *ngIf="params.canDelete" class="btn btn-danger btn-sm mb-1" (click)="OnActionClick($event, 'Delete')" title="Delete"><i class='fa fa-trash'></i></button>
  `,
})

export class GridActions {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  OnActionClick(e: Event, action: string){
    e.stopPropagation();
    this.params.clicked({action: action, data: this.params.data});
  }
}
