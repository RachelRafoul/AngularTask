import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TripsModel from '../models/trips';
import { environment } from '../environment';
import LineModel from '../models/line';
import OrderModel from '../models/order';
import OptionModel from '../models/optionModel';
import OrderListDTO from '../models/orderListDTO';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private _http: HttpClient) {
  }
  getAllTrips() {
    return this._http.get<TripsModel[]>(environment.PATH_URL + "Base/getAllTrips")
  }

  getAllOrders() {
    debugger
    return this._http.get<OrderListDTO[]>(environment.PATH_URL + "Base/getAllOrders")
  }
  getAllLines() {
    return this._http.get<LineModel[]>(environment.PATH_URL + "Base/getAllLines")
  }
  getDatesForLineAway(id: number) {
    return this._http.get<Date[]>(environment.PATH_URL + "Base/getDatesForLineAway/" + id)
  }
  getDatesForLineBack(id: number) {
    return this._http.get<Date[]>(environment.PATH_URL + "Base/getDatesForLineBack/" + id)
  }
  addOrder(order: OrderModel) {
    debugger
    order.orderId = 0;
    return this._http.post<number>(environment.PATH_URL + "Base/addOrder/", order)
  }
  getLineOptionModel() {
    return this._http.get<OptionModel[]>(environment.PATH_URL + "Base/getLineOptionModel/")
  }
  GetLineById(id: number) {
    debugger
    return this._http.get<LineModel>(environment.PATH_URL + "Base/getLineById/" + id)
  }
}
