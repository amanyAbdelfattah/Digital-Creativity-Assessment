import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { CountryModel } from 'src/models/CountryModel';
import { UserDetailsModel } from 'src/models/user/UserDetailsModel';
import { UserUpsertModel } from 'src/models/user/UserUpsertModel';
import { PasswordMatchingValidator } from 'src/modules/shared/validators/password-matching-validator';
import { AlertService } from 'src/services/alert.service';
import { CountriesService } from 'src/services/countries.service';
import { ModalService } from 'src/services/modal.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-users-upsert',
  templateUrl: './users-upsert.component.html',
  styleUrls: ['./users-upsert.component.scss']
})
export class UsersUpsertComponent implements OnInit {
  @Input() user?: any;
  userForm!: FormGroup;
  genders = ['male', 'female'];
  countries: CountryModel[] = [];

  constructor(
    public modalService: ModalService,
    public countriesService: CountriesService,
    public usersService: UsersService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user?.name, [Validators.required]),
      father_name: new FormControl(this.user?.father_name, [Validators.required]),
      grandfather_name: new FormControl(this.user?.grandfather_name, [Validators.required]),
      family_branch_name: new FormControl(this.user?.family_branch_name, [Validators.required]),
      gender: new FormControl(this.user?.gender, [Validators.required]),
      phone: new FormControl(this.user?.phone, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user?.password, [Validators.required]),
      password_confirmation: new FormControl(this.user?.password_confirmation, [Validators.required]),
      date_of_birth: new FormControl(this.user?.date_of_birth, [Validators.required]),
      country_id: new FormControl(this.user?.country_id, [Validators.required]),
      phone_code: new FormControl(this.user?.phone_code, [Validators.required]),
      country_code: new FormControl(this.user?.country_code, [Validators.required]),
      tribe: new FormControl(this.user?.tribe, [Validators.required]),
      active: new FormControl(this.user?.active == "True" || this.user?.active == 1 ? true : false),
      is_premium: new FormControl(this.user?.is_premium == "True" || this.user?.is_premium == 1 ? true : false)
    }, { validators: PasswordMatchingValidator });

    if(this.user) {
      this.userForm.controls["password"].disable();
      this.userForm.controls["password_confirmation"].disable();
    }
    this.countriesService.GetAll().subscribe((res: any) => {this.countries = res.data.data});
  }

  onSubmit() {
    if(this.user == undefined) {
      const user: UserUpsertModel = {
        name: this.userForm.controls['name'].value,
        father_name: this.userForm.controls['father_name'].value,
        grandfather_name: this.userForm.controls['grandfather_name'].value,
        family_branch_name: this.userForm.controls['family_branch_name'].value,
        gender: this.userForm.controls['gender'].value,
        phone: this.userForm.controls['phone'].value,
        email: this.userForm.controls['email'].value,
        password: this.userForm.controls['password'].value,
        password_confirmation: this.userForm.controls['password_confirmation'].value,
        date_of_birth: this.userForm.controls['date_of_birth'].value,
        country_id: this.userForm.controls['country_id'].value,
        phone_code: this.userForm.controls['phone_code'].value,
        country_code: this.userForm.controls['country_code'].value,
        tribe: this.userForm.controls['tribe'].value,
        active: this.userForm.controls['active'].value == null || this.userForm.controls['active'].value == false ? "0" : "1",
        is_premium: this.userForm.controls['is_premium'].value == null || this.userForm.controls['is_premium'].value == false ? "0" : "1"
      }
      this.usersService.CreateUser(user.name, user.father_name, user.grandfather_name, user.family_branch_name, user.gender, user.phone, user.email, user.password!, user.password_confirmation!, user.date_of_birth, user.country_id, user.phone_code, user.country_code, user.tribe, user.active, user.is_premium).subscribe({
        next: (res: any) => {
          console.log(res);
          this.alertService.fire(AlertType.Success);
          this.usersService.userUpdated.emit(user);
          this.modalService.closeModal();
        }, error: (error) => {
          debugger
          if(error.status == 422) {
            if(error.error.message == "قيمة الهاتف مُستخدمة من قبل.") {
              this.alertService.fire(null, "Oops..", "The phone number is already used", 'error')
            }
            else if(error.error.message == "قيمة البريد الالكتروني مُستخدمة من قبل.") {
              this.alertService.fire(null, "Oops..", "The email is already used", 'error')
            }else{
              this.alertService.fire(AlertType.Error);
            }
          }
        }
      });
    } else{
      const user: UserUpsertModel = {
        name: this.userForm.controls['name'].value,
        father_name: this.userForm.controls['father_name'].value,
        grandfather_name: this.userForm.controls['grandfather_name'].value,
        family_branch_name: this.userForm.controls['family_branch_name'].value,
        gender: this.userForm.controls['gender'].value,
        phone: this.userForm.controls['phone'].value,
        email: this.userForm.controls['email'].value,
        date_of_birth: this.userForm.controls['date_of_birth'].value,
        country_id: this.userForm.controls['country_id'].value,
        phone_code: this.userForm.controls['phone_code'].value,
        country_code: this.userForm.controls['country_code'].value,
        tribe: this.userForm.controls['tribe'].value,
        active: this.userForm.controls['active'].value == null || this.userForm.controls['active'].value == false ? "0" : "1",
        is_premium: this.userForm.controls['is_premium'].value == null || this.userForm.controls['is_premium'].value == false ? "0" : "1"
      }
      this.usersService.UpdateUser(this.user.id, user.name, user.father_name, user.grandfather_name, user.family_branch_name, user.gender, user.phone, user.email, user.date_of_birth, user.country_id, user.phone_code, user.country_code, user.tribe, user.active, user.is_premium).subscribe({
        next: () => {
          this.alertService.fire(AlertType.Success);
          this.usersService.userUpdated.emit(user);
          this.modalService.closeModal();
        }, error: () => {
          this.alertService.fire(AlertType.Error);
        }
      })
    }

  }
}
