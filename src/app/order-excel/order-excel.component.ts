import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { BaseService } from '../services/base.service';
import OrderListDTO from '../models/orderListDTO';

@Component({
  selector: 'app-order-excel',
  templateUrl: './order-excel.component.html',
  styleUrls: ['./order-excel.component.scss']
})
export class OrderExcelComponent implements OnInit {
  constructor(private service: BaseService) { }
  products: [] = []
  order: OrderListDTO[] |any


  ngOnInit(): void {
    this.service.getAllOrders().subscribe(data => {
      this.order = data
      debugger
      console.log(this.order + "order");
    })
    
  }

  exportExcelAway() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.order.away);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'orderAway');
    });
  }

  exportExcelBack() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.order.back);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'orderBack');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
