import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataGridComponent } from './data-grid/data-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { GridActions } from './data-grid/grid-actions.component';


@NgModule({
    declarations: [
        DataGridComponent,
        GridActions
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        AgGridModule,
    ],
    exports: [
        DataGridComponent
    ]
})
export class SharedModule { }
