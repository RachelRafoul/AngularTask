import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import EmployyesModel from '../models/EmployyesModel';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() id: number = 1;
  @Input() gotEmployee: any;
  employee: EmployyesModel = new EmployyesModel();
  employeeDetailForm: FormGroup | any;
  newEmployee: EmployyesModel = new EmployyesModel();
  ngOnInit(): void {
    this.employee = this.gotEmployee;

    // this._EmployeeService.getAllEmployees(this.id).subscribe(emp => {
    //   this.employee = emp[0] as EmployyesModel;
    debugger
    this.initializeForm();
    // }
    // )
  }
  constructor(public _EmployeeService: EmployeesService) {
  }
  private initializeForm() {
    this.employeeDetailForm = new FormGroup({
      "name": new FormControl(this.employee ? this.employee.name : '', Validators.required),
      "salary": new FormControl(this.employee ? this.employee.salary : '', Validators.required),
"dueDate": new FormControl(this.employee && this.employee.dueDate instanceof Date && !isNaN(this.employee.dueDate.getTime()) ? this.employee.dueDate : '', Validators.required),
      "age": new FormControl(this.employee ? this.employee.age : '', Validators.required)
    });
  }

  onSubmit() {
    if(this._EmployeeService.create){
      this.newEmployee.name = this.employeeDetailForm.value.name;
    this.newEmployee.salary = this.employeeDetailForm.value.salary;
    this.newEmployee.dueDate = this.employeeDetailForm.value.dueDate;
    this.newEmployee.age = this.employeeDetailForm.value.age;
    console.log("submit");
    this._EmployeeService.addEmployee(this.newEmployee).subscribe()
    this._EmployeeService.create=0;
    }else {
      this.employee.name = this.employeeDetailForm.value.name;
      this.employee.salary = this.employeeDetailForm.value.salary;
      this.employee.dueDate = this.employeeDetailForm.value.dueDate;
      this.employee.age = this.employeeDetailForm.value.age;
      this._EmployeeService.updateEmployee(this.employee).subscribe()
    }
    
  }
}
