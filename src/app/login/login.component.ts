import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private _loginService: LoginService, private route: Router) {
  }

  loginForm: FormGroup | any;
  btnSave: boolean = false;
  validation: boolean = true;


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "identity": new FormControl('', Validators.required),
      "mobile": new FormControl('', Validators.required),
    })

  }

  isValid(name: string): boolean {
    let control = null;
    control = this.loginForm?.get(name);
    if (control) {
      return control.invalid && control.touched;
    } else {
      return true;
    }
  }
  onLoginFormSubmit() {

    // *ngIf="validation"
    if (this.loginForm.status == "INVALID") {
      this.btnSave = true;
      return;
    }
    debugger
    this._loginService.authenticate(this.loginForm.value).subscribe(data => {
      localStorage.setItem("userData", JSON.stringify(data));
      this.route.navigate(['/orderExcel'])
    })
  }
}
