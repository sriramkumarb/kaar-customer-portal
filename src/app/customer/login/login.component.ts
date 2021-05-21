import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service'
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
    private userService: UserService) {
    console.log(this.userService.currentUserValue);


    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    // redirect to home if already logged in
    if (this.userService.currentUserValue) {
      console.log(this.userService.currentUserValue);

      this.router.navigate(['/cus-portal/dashboard']);
    }
  }
  isValid(controlName: any) {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }

  movetoregister() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }

  login() {

    if (this.loginForm.valid) {

      this.userService.login(this.loginForm.value).subscribe(
        data => {
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/cus-portal/dashboard'], { relativeTo: this.activatedRoute });
          location.reload()
        },
        error => {
          this.errorMessage = "Username and Password is Incorrect!"
        }
      )
    }
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

