import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { GridActionModel } from 'src/models/_common/GridActionModel';
import { GridDataModel } from 'src/models/_common/GridDataModel';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { UserFiltrationModel } from 'src/models/user/UserFiltrationModel';
import { UserListingModel } from 'src/models/user/UserListingModel';
import { AlertService } from 'src/services/alert.service';
import { DataGridService } from 'src/services/data-grid.service';
import { LoadingSpinnerService } from 'src/services/loading-spinner.service';
import { ModalService } from 'src/services/modal.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  gridData!: GridDataModel;
  users: UserListingModel[] = [];
  subscription: Subscription[] = [];
  types = ['user', 'admin'];
  genders = ['male', 'female'];
  filtrationForm!: FormGroup;
  filtration?: UserFiltrationModel;
  gridCols = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Father Name', field: 'father-name' },
    { headerName: 'Grandfather Name', field: 'grandfather-name' },
    { headerName: 'Family Branch Name', field: 'family_branch-name' },
    { headerName: 'Gender', field: 'Gender' },
    // { headerName: 'Email', field: 'email' },
    // { headerName: 'Date of Birth', field: 'date_of_birth' },
    // { headerName: 'Phone Number', field: 'phone' },
    // { headerName: 'Phone Code', field: 'phone_code' },
    // { headerName: 'Country Code', field: 'country_code' },
    { headerName: 'Is Premium', field: 'is_premium', cellStyle: this.SetIsPremiumStyle },
    { headerName: 'Role', field: 'type' },
    { headerName: 'Created at', field: 'created_at' },
    { headerName: 'Updated at', field: 'updated_at' },
    { headerName: 'Verified at', field: 'verified_at' },
  ];
  gridCustomButtons = [
    { id: 0, iconClass: 'fa-user', title: 'View Active Users', action: 'ViewUsers', btnClass: 'btn-success' },
    { id: 1, iconClass: 'fa-trash', title: 'View Deactivated Users', action: 'ViewDeactivatedUsers', btnClass: '' }
  ];

  constructor(
    private loaderService: LoadingSpinnerService,
    private usersService: UsersService,
    private dataGridService: DataGridService,
    private datePipe: DatePipe,
    private alertService: AlertService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.filtrationForm = new FormGroup({
      type: new FormControl(),
      gender: new FormControl(),
      is_premium: new FormControl()
    })
    const userUpdateSubscription = this.usersService.userUpdated.subscribe({
      next: (user: UserListingModel) => {
        this.onViewUsers(this.gridCustomButtons[0].id);
        const userIndex = this.gridData.data.findIndex((x) => x.id == user.id);
        if (userIndex >= 0) {
          this.gridData.data[userIndex] = user;
          this.dataGridService.dataUpdated.emit();
        } else {
          this.gridData.data.unshift(user);
          this.dataGridService.dataUpdated.emit();
        }
        this.onUpdateUsersListing();
      },
    });
    this.onGetAllUsers();
    this.subscription.push(userUpdateSubscription)
  }

  SetIsPremiumStyle(params: any) {
    const is_premium = params.data.is_premium;
    let textColor;
    is_premium == "True" ? textColor = 'var(--bs-success)' : textColor = 'var(--bs-danger)'
    return {
      color: textColor,
      fontWeight: 'bold'
    };
  }

  onActionClicked(gridAction: GridActionModel) {
    switch (gridAction.action) {
      case 'Add':
        this.modalService.openModal('users-upsert');
        break;
      case 'Edit':
        this.modalService.openModal('users-upsert',new Map<string, any>([['user', gridAction.data]]));
        break;
      case 'ViewUsers':
        this.onViewUsers(this.gridCustomButtons[0].id);
        break;
      case 'ViewDeactivatedUsers':
        this.onViewDeactivatedUsers(this.gridCustomButtons[1].id);
        break;
      case 'ToggleActive':
        this.onToggleActive(gridAction.data);
        break;
      default:
        break;
    }
  }

  onToggleActive(data: any) {
    this.alertService.confirm("Are you sure you want to change the active status of this user?")
    .then((result) => {
      if(result.value) {
        this.loaderService.start();
        this.usersService.ToggleActivation(data.id).pipe(finalize(() => {
          this.loaderService.stop();
        })).subscribe({
          next: (res: any) => {
            this.onGetAllUsers();
            this.dataGridService.dataUpdated.emit();
          }
        });
      }
    })
  }

  onClearFiltration(){
    this.filtrationForm.reset();
    this.filtration!.gender = undefined;
    this.filtration!.is_premium = undefined;
    this.filtration!.type = undefined;
    this.onGetAllUsers();
  }

  onFilter() {
    this.filtration = {
      type: this.filtrationForm.controls['type'].value,
      gender: this.filtrationForm.controls['gender'].value,
      is_premium: this.filtrationForm.controls['is_premium'].value == null || this.filtrationForm.controls['is_premium'].value == false ? 0 : 1
    }
    this.onGetAllUsers(this.filtration)
  }

  onGetAllUsers(userFiltration?: UserFiltrationModel) {
    this.loaderService.start();
    this.usersService.GetAll(userFiltration).pipe(finalize(() => {
      this.loaderService.stop()
    })).subscribe({
      next: (res: any) => {
        this.gridData = res.data;
        this.users = res.data;
        this.dataGridService.dataUpdated.emit();
        this.onUpdateUsersListing();
        this.onViewUsers(this.gridCustomButtons[0].id);
      }, error: () => {
        this.alertService.fire(AlertType.Error);
      }
    });
  }

  onViewUsers(index: number) {
    debugger
    this.gridCustomButtons.forEach((button, i) => {
      button.btnClass = i === index ? 'btn-success' : '';
    });
    this.onUpdateUsersListing();
    this.users = this.users.filter(user => user.active == "True");
    this.dataGridService.dataUpdated.emit();
  }

  onViewDeactivatedUsers(index: number) {
    this.gridCustomButtons.forEach((button, i) => {
      button.btnClass = i === index ? 'btn-success' : '';
    });
    this.onUpdateUsersListing();
    this.users = this.users.filter(user => user.active == "False");
    this.dataGridService.dataUpdated.emit();
  }

  onUpdateUsersListing() {
    this.users = this.gridData.data.map((user) => {
      return {
        active: user.active == 0 ? "False" : "True",
        code: user.code,
        email: user.email,
        id: user.id,
        country: user.county,
        country_code: user.country_code,
        country_id: user.country_id,
        created_at: this.datePipe.transform(user.created_at , 'MM/dd/yyyy, h:mm a')!,
        date_of_birth: user.date_of_birth,
        family_branch_name: user.family_branch_name,
        father_name: user.father_name,
        gender: user.gender,
        grandfather_name: user.grandfather_name,
        image: user.image,
        is_premium: user.is_premium == 0 ? "False" : "True",
        name: user.name,
        phone: user.phone,
        phone_code: user.phone_code,
        tribe: user.tribe,
        type: user.type,
        updated_at: this.datePipe.transform(user.updated_at , 'MM/dd/yyyy, h:mm a')!,
        verified_at: this.datePipe.transform(user.verified_at , 'MM/dd/yyyy, h:mm a')!,
      }
    });
  }
}
