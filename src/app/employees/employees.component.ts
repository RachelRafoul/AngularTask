import { Component, OnInit } from '@angular/core';
import EmployyesModel from '../models/EmployyesModel';
import { EmployeesService } from '../services/employees.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
event: string|undefined;

  constructor(public _EmployeeService : EmployeesService) {
  }
  
ngOnInit(): void {
// this.Employees = this.getAllEmployees();
this.filteredEmployees = this.Employees;
this.filterForm = new FormGroup({
  filterBySalary: new FormControl(['']),
  filterById: new FormControl([''])
});

}
Employees: EmployyesModel[] | any=[{"id":1,"name":"Michael","salary":8000 , "dueDate":"02-02-2024","age": 23},{"id":2,"name":"Rachely","salary":5000 , "dueDate":"01-01-2024","age": 20}];
filteredEmployees: EmployyesModel[] = [];
EmployeesToShow: EmployyesModel | any;


getAllEmployees() {
  console.log("start");
  
 this._EmployeeService.getAllEmployees().subscribe(    employees => {
  this.Employees = employees;
})
  console.log("finish");
  console.log(this.Employees[0]);
}
showSelectedEmployee(emp :any){
  debugger
  this._EmployeeService.employeeToShowBool=1;
  this.EmployeesToShow=emp;
}
closeDetails(){
  this._EmployeeService.employeeToShowBool=0;

}

searchById(){
  debugger
  const IdFilter = this.filterForm.value.filterById.toString().toLowerCase();
  this.filteredEmployees = this.Employees.filter((employee: EmployyesModel) =>
    employee.id.toString().toLowerCase().includes(IdFilter)
  );
}
filterForm :any;
SearchBySalary(): void {
  debugger
  const salaryFilter = this.filterForm.value.filterBySalary.toString().toLowerCase();
  this.filteredEmployees = this.Employees.filter((employee: EmployyesModel) =>
    employee.salary.toString().toLowerCase().includes(salaryFilter)
  );
}
filterBySalary():void{
  debugger
  this.filteredEmployees = this.Employees.sort((a:EmployyesModel, b:EmployyesModel) => a.salary - b.salary);
}
filterByAge():void{
  this.filteredEmployees = this.Employees.sort((a:EmployyesModel, b:EmployyesModel) => a.age - b.age); // מיון לפי גיל
}
addEmployee(){
  this._EmployeeService.employeeToShowBool=1;
  this._EmployeeService.create=1;
}
}
