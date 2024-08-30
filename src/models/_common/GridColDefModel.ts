export interface GridColDefModel {
  headerName: string;
  field?: string;
  cellRendererName?: string;
  width?: number;
  maxWidth?: number;
  autoWidth?: boolean;
  autoHeight?: boolean;
  sortable?: boolean;
  cellStyle?: any;
  withSelection?: boolean;
  hide?: boolean;
}
