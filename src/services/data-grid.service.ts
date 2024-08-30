import { EventEmitter, Injectable } from '@angular/core';
import { GridActionModel } from 'src/models/_common/GridActionModel';

@Injectable({
  providedIn: 'root'
})
export class DataGridService {
  dataUpdated = new EventEmitter<any>();
  actionClicked = new EventEmitter<GridActionModel>();
}
