import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userId = -1;
  private userDetails = new Users;

  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private dataService: DataService) { }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl({ value: '', disabled: true }),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      location: new FormControl('', [
        Validators.required])
    });

    // get login status from service
    // get userId from service and assign it to userId property
    this.userId = this.dataService.getUserId()
    // get profile details and display it
    this.getProfileDetails();
    if (this.userId === -1) {
      this.editProfileForm.patchValue({
        userName: '',
        mobile: '',
        email: '',
        location: ''
      });
    }

  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form
    if (this.editProfileForm.invalid) {
      return;
    }

    // if successfully changed the profile it should display new details hiding the form
    const updatePayload = {
      mobile: this.editProfileForm.get('mobile').value,
      email: this.editProfileForm.get('email').value,
      location: this.editProfileForm.get('location').value,
      username: this.userDetails.username,
      userId: this.userId
    }

    this.dataService.updateProfile(updatePayload).subscribe(
      (response) => {
        if (!response) {
          return;
        }
        this.getProfileDetails();
        this.discardEdit();
      },
      (error) => {
      }
    );

  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;
    
    this.editProfileForm.updateValueAndValidity();
  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;
    this.editProfileForm.reset({
      userName: this.userDetails.username,
      mobile: this.userDetails.mobile,
      email: this.userDetails.email,
      location: this.userDetails.location
    });
  }

  getProfileDetails() {

    // retrieve user details from service using userId
    this.dataService.getUserDetails(this.userId).subscribe(
      (response) => {
        this.userDetails = response;
        console.log(response, this.userDetails)
        this.editProfileForm.patchValue({
          userName: response.username,
          mobile: response.mobile,
          email: response.email,
          location: response.location
        });
      },
      (error) => {
        this.editProfileForm.patchValue({
        userName: '',
        mobile: '',
        email: '',
        location: ''
      });
      }
    );

  }

}
