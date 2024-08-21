import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import TripsModel from '../models/trips';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import LineModel from '../models/line';
import OptionModel from '../models/optionModel';
import { DatePipe } from '@angular/common';
import TempModel from '../models/tempModel';
import OrderModel from '../models/order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private _baseService: BaseService) {
  }
  filteredTrips: any[] = [];
  baseForm: FormGroup | any;
  orderForm: FormGroup | any;
  trips: TripsModel[] = [];
  lines: LineModel[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, this.minDate.getDay());
  datesForLineBack: Date[] = [];
  datesForLineAway: Date[] = [];
  timesForLineBack: any[] = [];
  timesForLineAway: any[] = [];
  isDate: boolean = false;
  isDateBack: boolean = false;
  selectedTimeAway: string = '';
  selectedTimeBack: string = '';
  ifOrder: boolean = true;
  ifShow: boolean = false;
  optionModel: OptionModel[] = [];
  tempModel: TempModel = new TempModel;
  pipe = new DatePipe('en-US');

  ngOnInit(): void {
    this._baseService.getAllTrips().subscribe(
      trip => this.trips = trip
    )

    this._baseService.getLineOptionModel().subscribe(
      opt => this.optionModel = opt
    )

    this._baseService.getAllLines().subscribe(
      line => {
        this.lines = line
      }
    )

    this.baseForm = new FormGroup({
      "dateTripAway": new FormControl('', Validators.required),
      "dateTripBack": new FormControl('', Validators.required),
      "line": new FormControl('', Validators.required),
    })
  }
  filterTrips(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.optionModel.length; i++) {
      let opt = this.optionModel[i];
      if (opt.desc.includes(query, 0)) {
        filtered.push(opt);
      }
    }
    this.filteredTrips = filtered;
  }

  getDatesForLineAwayAndBack(id: number) {
    this._baseService.getDatesForLineAway(id).subscribe(d => {
      this.datesForLineAway = d
      this._baseService.getDatesForLineBack(id).subscribe(data => {
        this.datesForLineBack = data
      })
    })
  }
  getDate() {
    if (this.baseForm.value.line.id >= 0) {
      this.getDatesForLineAwayAndBack(this.baseForm.value.line.id);
    }
  }

  checkDateAway(dateChoose: Date) {
    this.isDate = false;
    this.timesForLineAway = [];
    this.datesForLineAway.forEach(date => {
      if (new Date(date).getDate() == dateChoose.getDate()) {
        this.isDate = true;
        this.timesForLineAway.push(new Date(date).toLocaleTimeString('en-Gb', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZone:"Asia/Jerusalem"
        }))
      }
    })
    this.tempModel.dateAway = dateChoose;
    console.log(this.timesForLineAway);
  }

  checkDateBack(dateChoose: Date) {
    this.isDateBack = false;
    this.timesForLineBack = [];
    this.datesForLineBack.forEach(date => {
      if (this.pipe.transform(date, 'dd/MM/YYYY') == this.pipe.transform(dateChoose, 'dd/MM/YYYY')) {
        console.log(new Date(date));
        this.isDateBack = true;
        this.timesForLineBack.push(new Date(date).toLocaleTimeString('en-Gb', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZone:"Asia/Jerusalem"
        }))
      }
      this.tempModel.dateBack = dateChoose
    });
    console.log(this.timesForLineBack);
  }

  order() {
    if (this.baseForm.isValid == false || this.selectedTimeAway == '' || this.selectedTimeBack == '') {
      this.ifOrder = false;
      return;
    }
    else {
      this.ifShow = true;
      this.tempModel.timeAway = this.selectedTimeAway;
      this.tempModel.timeBack = this.selectedTimeBack;
      this.tempModel.lineId = this.baseForm.value.line.id
    }

  }
}
