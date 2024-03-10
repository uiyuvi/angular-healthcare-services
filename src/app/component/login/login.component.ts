import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { DataService } from '../../services/data.service';
import * as alertify from 'alertify.js';//import

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	// viewProviders:[{provide: ControlContainer, useExisting:NgForm}]
})
export class LoginComponent implements OnInit {

	isLoggedIn: boolean = false;
	loginForm: FormGroup;
	isLoginFailed: boolean = false;

	emptyUserName = 'You must enter a username';
	minlengthUserName = 'User name must be at least 3 characters long';
	maxlengthUserName = 'Username cannot exceed 20 characters';
	userNamePattern = 'Username should be in alphanumeric only';

	emptyPassword = 'You must enter a password';
	minlengthPassword = 'Password must be at least 8 characters long';
	maxlengthPassword = 'Password cannot exceed 20 characters';
	passwordPattern = 'Pattern does not match';

	constructor(private route: Router, private dataService: DataService) {

	}

	ngOnInit() {

		// add necessary validators

		this.loginForm = new FormGroup({
			userName: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20),
				Validators.pattern(/^[a-zA-Z0-9]*$/)
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(20),
				Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%@#*?&£€])[A-Za-z\d!$%@#*?&£€]*$/)
			])
		});
	}

	onSubmit() {
		localStorage.removeItem('uid');
		localStorage.removeItem('token');
		if (!this.loginForm.valid) {
			return;
		}
		this.doLogin()
	}

	doLogin() {

		// call authenticateUser method to perform login operation
		// if success, redirect to profile page
		// else display appropriate error message
		// reset the form


		const credentials = {
			userName: this.loginForm.value.userName,
			password: this.loginForm.value.password
		};

		this.dataService.authenticateUser(credentials.userName, credentials.password).subscribe(
			(response) => {
				// Successful login
				if (!response) {
					this.isLoginFailed = false;
					return;
				}
				this.isLoggedIn = true;
				this.route.navigate(['/profile']);
			},
			(error) => {
				// Handle login error (display error message, etc.)
				this.isLoginFailed = true;// Customize error message
				this.loginForm.reset();
			}
		);
	}


	signUp() {
		// should navigate to register new user page
		this.route.navigate(['/register_user']);
	}

}



