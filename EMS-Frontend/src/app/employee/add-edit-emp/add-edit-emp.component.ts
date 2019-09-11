import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

import { DefaultService } from 'src/app/common/default.service';
import { Department } from '../../models/department';
import { Designation } from '../../models/designation'
import { State } from 'src/app/models/state';
import { Bloodgroup } from '../../models/bloodgroup'
import { EmployeeService } from '../employee.service';
import { Identitytype } from '../../models/identitytype';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  //#region VARIABLES
  employeeForm: FormGroup;
  submitted = false;

  //Variables for Image-Upload
  fileName;
  private imageURL;
  errorMessage;
  isValidFileSize: boolean;
  isValidFileType: boolean;

  private identityTypeStr: string;
  private departmentStr: string;
  private designationStr: string;
  private bloodgroupStr: string;
  private stateStr: string;
  private empFormHeader: string;

  departments: Department[];
  designations: Designation[];
  identitytypes: Identitytype[];
  states: State[];
  bloodgroups: Bloodgroup[];
  private genderList: string[];
  private employeeId: number;
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private defaultService: DefaultService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }
  //#endregion

  //#region EVENTS & METHODS
  ngOnInit() {
    // Get EmployeeId
    this.employeeId = +this.activeRoute.snapshot.params["id"];

    // For Gender
    this.genderList = ['Male', 'Female'];

    this.departments = this.defaultService.departments;
    this.states = this.defaultService.states;
    this.bloodgroups = this.defaultService.bloodgroups;
    this.identitytypes = this.defaultService.identitytype;
    this.empFormHeader = 'Add';

    this.fileName = "Choose File";

    // Initialize Angular Reactive Form
    this.initForm();

    // Get employee by Id if in Edit mode
    if (this.employeeId > 0) {
      this.empFormHeader = 'Edit';
      this.onGetEmployeeById(this.employeeId);
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.employeeForm.controls; }

  // Add/Edit Employee
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    // Dropdown set text
    this.employeeForm.value.department = this.departmentStr;
    this.employeeForm.value.designation = this.designationStr;
    this.employeeForm.value.identityType = this.identityTypeStr;
    this.employeeForm.value.bloodGroup = this.bloodgroupStr;
    this.employeeForm.value.state = this.stateStr;

    // Set gender character
    this.employeeForm.value.gender = this.employeeForm.value.gender.charAt(0);

    // For image
    this.employeeForm.value.image = this.imageURL;

    // For edit
    if (this.employeeId > 0) {
      this.employeeService.editEmployee(this.employeeId, this.employeeForm.value).subscribe(emp => {
        this.toastr.success("Employee updated successfully.");
        this.router.navigate(['/employee'], { relativeTo: this.activeRoute });
      }, error => {
        this.toastr.error("Error occured while updating employee.");
      });
    }
    // For add
    else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(emp => {
        this.toastr.success("Employee added successfully.");
        this.employeeForm.reset();
        this.router.navigate(['/employee'], { relativeTo: this.activeRoute });
      }, error => {
        this.toastr.error("Error occured while adding employee.");
      });
    }
  }

  // Display Identity textbox dynamically based on type
  onIdentityChange(event, index) {
    this.identityTypeStr = event.target.options[index].text;

    if (index === '0')
      this.identityTypeStr = null;
  }

  // Department Dropdown change event
  onDepartmentChange(event, index) {
    this.departmentStr = event.target.options[index].text;
    this.designations = this.defaultService.getDesignations(event, index);
  }

  // Designation Dropdown change event
  onDesignationChange(event, index) {
    this.designationStr = event.target.options[index].text;
  }

  // BloodGroup Dropdown change event
  onBloodGroupChange(event, index) {
    this.bloodgroupStr = event.target.options[index].text;
  }

  // BloodGroup Dropdown change event
  onStateChange(event, index) {
    this.stateStr = event.target.options[index].text;
  }

  // Get employee details by Id
  onGetEmployeeById(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(emp => {

      // For update set text
      this.departmentStr = emp.department;
      this.designationStr = emp.designation;
      this.stateStr = emp.state;
      this.bloodgroupStr = emp.bloodGroup;
      this.identityTypeStr = emp.identityType;

      // Form patchValue
      this.employeeForm.patchValue({
        employeeId: emp.employeeId,
        firstName: emp.firstName,
        lastName: emp.lastName,
        fatherName: emp.fatherName,
        email: emp.email,
        dateOfBirth: this.defaultService.parseDate2(emp.dateOfBirth),
        dateOfJoining: this.defaultService.parseDate2(emp.dateOfJoining),
        department: emp.departmentId,
        designation: emp.designationId,
        address: emp.address,
        state: emp.stateId,
        city: emp.city,
        postcode: emp.postcode,
        contactNumber: emp.contactNumber,
        gender: emp.gender === 'M' ? 'Male' : 'Female',
        maritalStatus: emp.maritalStatus === true ? 'true' : 'false',
        image: emp.image,
        bloodGroup: emp.bloodGroupId,
        identityType: emp.identityTypeId,
        identityNumber: emp.identityNumber
      });
      // Get designation list.
      this.designations = this.defaultService.getDesignations(event, emp.departmentId.toString());
      // To get identity type string e.g. Aadhaar Card, License, PAN Card etc.
      this.identityTypeStr = this.defaultService.getIdentityType(+emp.identityType);
    });
  }

  // Reset employee form
  onReset() {
    this.employeeForm.reset();
    this.onGetEmployeeById(this.employeeId);
  }

  // Validate selected file & convert file in Base64String
  onFileSelected(event) {
    let file: File = event.target.files[0]; // Get selected file from event

    let fileType = file.type; // Get file type
    let fileSize = file.size / Math.pow(1024, 2); // Convert filesize from bytes to MB
    let supportedImages = ['png', 'jpg', 'jpeg', 'gif', 'tif', 'bmp']; // Declaration for supported files for profile image

    let arrExtension = fileType.split('/'); // e.g. image/png, image/jpeg
    let imgExtension = arrExtension[arrExtension.length - 1]; // Get file extension => e.g. png, jpeg

    // Validate file extension
    if (!supportedImages.includes(imgExtension)) {
      this.isValidFileType = false;
      this.fileName = "Choose File";
      this.errorMessage = "Image type should be .jpg | .jpeg | .png | .gif | .tif | .bmp";
    } else
      this.isValidFileSize = true;

    // Validate file size
    if (fileSize > 2) {
      this.isValidFileSize = false;
      this.fileName = "Choose File";
      this.errorMessage = "Filesize must be less than 2MB.";
    } else
      this.isValidFileType = true;

    // Convert file in base64string type
    if (this.isValidFileSize && this.isValidFileType) {
      this.isValidFileSize = true;
      this.isValidFileType = true;
      this.fileName = file.name;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageURL = reader.result;
      }
    }
  }

  // Initialize Form - Reactive
  private initForm() {
    this.employeeForm = this.formBuilder.group({
      employeeId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      dateOfJoining: [null, Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      contactNumber: [null, Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      image: [null],
      bloodGroup: ['', Validators.required],
      identityType: ['', Validators.required],
      identityNumber: ['', Validators.required]
    });
  }
  //#endregion
}
