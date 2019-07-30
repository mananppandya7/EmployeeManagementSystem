import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { DefaultService } from 'src/app/common/default.service';
import { Department } from '../../models/department';
import { Designation } from '../../models/designation'
import { State } from 'src/app/models/state';
import { Bloodgroup } from '../../models/bloodgroup'

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  employeeForm: FormGroup;

  identityType: string;
  departments: Department[];
  designations: Designation[];
  states: State[];
  bloodgroups: Bloodgroup[];

  constructor(private defaultService: DefaultService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.departments = this.defaultService.departments;
    this.states = this.defaultService.states;
    this.bloodgroups = this.defaultService.bloodgroups;

    this.initForm();
  }

  // Add/Edit Employee
  onSubmit() {
    let employeeData = this.employeeForm.value;
    console.log(employeeData);
  }

  // Display Identity textbox dynamically based on type
  onIdentityChange(event, index) {
    this.identityType = event.target.options[index].text;

    if (index === '0')
      this.identityType = null;
  }

  //Department Dropdown change evrnt
  onDepartmentChange(event, index) {
    this.designations = this.defaultService.getDesignations(event, index);
  }

  // Initialize Form - Reactive
  private initForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      dateOfBirth: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      department: ["0", Validators.required],
      designation: ["0", Validators.required],
      address: ['', Validators.required],
      state: ["0", Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      contactNumber: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      image: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      identityType: ["0", Validators.required],
      identityNumber: ['', Validators.required]
    });
  }

}
