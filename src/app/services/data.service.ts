
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DataService {

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;
  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(username: string, password: string): Observable<boolean> {

    // store 'userId' from response as key name 'userId' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated 

    return this.api.checkLogin(username, password).pipe(
      map((response: any) => {
        if (!response.userId) {
          this.isLogIn = new BehaviorSubject<boolean>(false);
          return false;
        }
        localStorage.setItem('userId', response.userId);
        this.isLogIn = new BehaviorSubject<boolean>(true);
        // Return true if user authenticated
        return true;
      }),
      catchError((error) => {
        // Handle authentication error (e.g., invalid credentials)
        console.error('Authentication failed:', error);
        this.isLogIn = new BehaviorSubject<boolean>(false);
        return of(false); // Return false if user not authenticated
      })
    );
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLogIn.asObservable();
  }
  doLogOut() {
    // remove the key 'userId' if exists
    localStorage.removeItem('userId');
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  getUserDetails(userId: number): Observable<Users> {

    // should return user details retrieved from api service

    return this.api.getUserDetails(userId).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('get user details failed:', error);
        return error;
      })
    );
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return the updated status according to the response from api service

    return this.api.updateDetails(userDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('update userdetails failed:', error);
        return of(false);
      })
    );
  }

  registerPatient(patientDetails): Observable<any> {


    // should return response retrieved from ApiService

    // handle error 

    return this.api.registerPatient(patientDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('resigster patient failed:', error);
        return error;
      })
    );

  }

  getAllPatientsList(): Observable<any> {


    // should return all patients list retrieved from ApiService

    // handle error 

    return this.api.getAllPatientsList().pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('get all patient list failed:', error);
        return error;
      })
    );

  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error 

    return this.api.getParticularPatient(id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('particular patient details failed:', error);
        return error;
      })
    );
  }

  getDiseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getDiseasesList().pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('disease list failed:', error);
        return error;
      })
    );
  }

  bookAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.bookAppointment(appointmentDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('schedule appointment failed:', error);
        return error;
      })
    );
  }

  getAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getAppointments(patientId).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('single patient appointments failed:', error);
        return error;
      })
    );
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.deleteAppointment(appointmentId).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('appointment deletion failed:', error);
        return error;
      })
    );
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.requestedAppointments().pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('requested appointments failed:', error);
        return error;
      })
    );
  }

  getUserId(): number {

    // retrieve 'userId' from localstorage
    if (!this.isLogIn.getValue() || !localStorage.getItem('userId')) {
      return -1;
    }
    return Number(localStorage.getItem('userId'));
  }


}

