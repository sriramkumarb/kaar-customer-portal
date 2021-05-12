import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  isValid(controlName: any) {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }

  movetoregister() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }

}
