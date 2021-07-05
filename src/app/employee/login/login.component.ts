import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../service/index'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: any = '';
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeservice: EmployeeService) {
    this.loginForm = new FormGroup({
      Username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  isValid(controlName: any) {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;

  }

  login() {
    if (this.loginForm.valid) {
      this.employeeservice.login(this.loginForm.value).subscribe(data => {
        localStorage.setItem('employee', JSON.stringify(data));
        this.router.navigate(['/emp-portal/dashboard'], { relativeTo: this.activatedRoute });
      })
    }
  }

}
