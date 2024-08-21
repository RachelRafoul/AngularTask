import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../services/base.service';
import LineModel from '../models/line';
import TempModel from '../models/tempModel';
import OrderModel from '../models/order';
import { MessageService,PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {


  constructor(private _baseService: BaseService, private messageService: MessageService) {
  }
  @Input() tempModel = new TempModel
  orderForm: FormGroup | any;
  line: LineModel | any;
  btnSave: boolean = false;


  count: number = 0;

  ngOnInit(): void {

    this._baseService.GetLineById(this.tempModel.lineId).subscribe(data => {
      this.line = data
    })

    this.orderForm = new FormGroup({
      "orderId": new FormControl('',),
      "lineId": new FormControl(this.tempModel.lineId),
      "phone": new FormControl('', [Validators.required, Validators.maxLength(11)]),
      "numOfAdoultOrders": new FormControl(0, [Validators.required, Validators.min(0)]),
      "numOfChildrenOrders": new FormControl(0, [Validators.required, Validators.min(0)]),
      "dateBackSide": new FormControl(this.tempModel.dateBack),
      "dateAwaySide": new FormControl(this.tempModel.dateAway),
    })
  }
  showError() {
    this.messageService.add({ key:'tc',severity: 'error', summary: 'Error', detail: 'Message Content' });
  }
  showSuccess() {
    this.messageService.add({key:'tc', severity: 'success', summary: 'Success', detail: 'Message Content' });
  }


  isValid(name: string): boolean {
    let control = null;
    control = this.orderForm?.get(name);
    if (control) {
      return control.invalid && control.touched;
    } else {
      return true;
    }
  }


  countAdoult() {
    this.count = this.orderForm.value.numOfAdoultOrders
    this.orderForm.controls["numOfChildrenOrders"].setValidators([Validators.max(15 - this.count)]);
  }
  countChild() {
    this.count = this.orderForm.value.numOfChildrenOrders
    this.orderForm.controls["numOfAdoultOrders"].setValidators([Validators.max(15 - this.count)]);
  }

  onFormSubmit() {
    if (this.orderForm.status == "INVALID") {
      // this, this.btnSave = true;
      this.btnSave = true;
      return;
    }
    var x = this.orderForm.value.dateAwaySide
    var a = (this.tempModel.timeAway).slice(0, 2)
    var b = (this.tempModel.timeAway).slice(3, 5)
    this.orderForm.value.dateAwaySide = new Date(x.getFullYear(), x.getMonth(), x.getDate(), Number(a) + 3, Number(b))
    var x1 = this.orderForm.value.dateBackSide
    var a1 = (this.tempModel.timeBack).slice(0, 2)
    var b1 = (this.tempModel.timeBack).slice(3, 5)
    this.orderForm.value.dateBackSide = new Date(x1.getFullYear(), x1.getMonth(), x1.getDate(), Number(a1) + 2, Number(b1))
    console.log(this.orderForm.value + "   form");
    this._baseService.addOrder(this.orderForm.value).subscribe(() => {
      this.showSuccess()
    }, err => {
      this.showError()
    })
  }

  orderModel: OrderModel = new OrderModel;
  orderCard() {


  }
}
