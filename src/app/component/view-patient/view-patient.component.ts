import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
//import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  listOfDiseases;
  names;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;

  constructor(fb: FormBuilder,private route: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    // add necessary validators
    this.appointmentForm = fb.group({
      'selectDisease' : [null],
      'tentativeDate' : [null],
      'priority' : [null]
    })

   }

  ngOnInit() {

    // get selected patient id
    // get Particular Patient from service using patient id and assign response to patient property
    this.activatedRoute.paramMap.switchMap((params: ParamMap) => {
      return this.dataService.getParticularPatient(params.get('id'))
    }).subscribe(
      (response) => {
        // Successful login
        this.patient = response;
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );
  }

  bookAppointment() {
    // get diseases list from service
    this.isBookAppointment = false;
    this.isScheduledAppointment = true;
    this.isFormEnabled = true;
    this.isTableEnabled = false;
    this.dataService.getDiseasesList().subscribe(
      (response) => {
        // Successful login
        this.listOfDiseases = response;
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, patientFirstName, patientLastName, disease, priority, tentativedate, registeredTime

    // if booked successfully should redirect to 'requested_appointments' page
    const appointmentDetailsForAPI = {
      patientId: this.patient.id,
      fname: this.patient.fname,
      lname: this.patient.lname,
      disease: this.appointmentForm.controls.selectDisease.value,
      priority: this.appointmentForm.controls.priority.value,
      AppointmentDate: this.appointmentForm.controls.tentativeDate.value,
      bookingTime: this.today
    }
    this.dataService.bookAppointment(appointmentDetailsForAPI).subscribe(
      (response) => {
        // Successful login
        console.log(response)
        this.route.navigate(['/requested_appointments'])
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );
    
  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    // get particular patient appointments using getAppointments method of DataService 
    this.isBookAppointment = true;
    this.isScheduledAppointment = false;
    this.isFormEnabled = false;
    this.isTableEnabled = true;
    this.dataService.getAppointments(this.patient.id).subscribe(
      (response) => {
        // Successful login
        this.ScheduledAppointmentResponse = response;
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );

  }

  cancelAppointment(id) {

    // delete selected appointment uing service
    this.dataService.deleteAppointment(id).subscribe(
      (response) => {
        // Successful login
        this.scheduleAppointment()
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );
    // After deleting the appointment, get particular patient appointments

  }
  
}
