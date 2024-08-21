import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import EmployyesModel from '../models/EmployyesModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {


  Path_URL = "https://dummy.restapiexample.com/api/v1/"
  constructor(private _http: HttpClient) {
  }
  employeeToShowBool = 0;
  create =0;
  getAllEmployees(id?: number) {
    if (id) {
      return this._http.get<EmployyesModel[]>(this.Path_URL + "employee/{id}")

    }
    return this._http.get<EmployyesModel[]>(this.Path_URL + "employees")
  }
  
  addEmployee(emp: EmployyesModel) {
    debugger
    return this._http.post(this.Path_URL + "create", { emp })
  }
  updateEmployee(emp: EmployyesModel) {
    debugger
    return this._http.put(this.Path_URL + `update/${emp.id}`,emp)
  }
  deleteEmployee(id:number){
    return this._http.delete(this.Path_URL + `delete/${id}`)
  }
}
