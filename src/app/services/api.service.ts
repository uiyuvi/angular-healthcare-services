import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;
  AUTH_API_URL = '/auth/server/';

  constructor(private http: HttpClient) {
    this.API_URL = 'api';
  }

  public checkLogin(username: string, password: string): Observable<Credentials> {
    // should return response from server

    // handle error 
    const body = {
      username: username,
      password: password
    }; // Create request body


    // Make an HTTP POST request to your login endpoint
    return this.http.post(`${this.API_URL}${this.AUTH_API_URL}`, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(() => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          error: {
            message: 'Invalid username or password'
          },
          status: 401,
          statusText: 'Invalid username or password'
        });
      })
    );
  }

  public getUserDetails(userId: number): Observable<Users> {
    // should return user details retireved from server

    // handle error 

    return this.http.get(`${this.API_URL}/users/${userId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  public updateDetails(userDetails: Users): Observable<Users> {
    // should return user details if successfully updated the details

    // handle error 

    return this.http.put(`${this.API_URL}/users/${userDetails.userId}`, userDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  public registerPatient(patientDetails: any): Observable<any> {

    // should return response from server if patientDetails added successfully

    // handle error 

    return this.http.post(`${this.API_URL}/allpatients`, patientDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server

    // handle error 

    return this.http.get(`${this.API_URL}/allpatients`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  public getParticularPatient(id): Observable<any> {

    // should return particular patient details from server

    // handle error 
    return this.http.get(`${this.API_URL}/allpatients/${id}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );

    return;
  }

  public getDiseasesList(): Observable<any> {

    // should return diseases from server

    // handle error 
    return this.http.get(`${this.API_URL}/diseases`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );

  }

  public bookAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully

    // handle error 

    return this.http.post(`${this.API_URL}/reqappointments`, appointmentDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server

    // handle error 

    return this.http.get(`${this.API_URL}/reqappointments`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  public getAppointments(userId): Observable<any> {

    // should return appointments of particular patient from server

    // handle error 

    return this.http.get(`${this.API_URL}/reqappointments?patientId=${userId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  public deleteAppointment(appointmentId): Observable<any> {

    // should delete the appointment

    // handle error

    return this.http.delete(`${this.API_URL}/reqappointments/${appointmentId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
  
}
