import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorsService } from './interceptors/token-interceptors.service';
import { OrderExcelComponent } from './order-excel/order-excel.component';
import { CardModule } from "primeng/card";
import { ToastModule } from 'primeng/toast';
import { TableModule} from 'primeng/table'
import { AgGridModule } from '@ag-grid-community/angular';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrderComponent,
    LoginComponent,
    OrderExcelComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule ,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    CalendarModule,
    DropdownModule,
    CardModule,
    ToastModule,
    TableModule
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorsService,
      multi: true
    },
    // provider used to create fake backend
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
