import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../service/index'
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
    private vendorservice: VendorService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
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

      this.vendorservice.login(this.loginForm.value).subscribe(data => {
        localStorage.setItem('vendor', JSON.stringify(data));
        this.router.navigate(['/ven-portal/dashboard'], { relativeTo: this.activatedRoute });
      },
        error => {
          this.errorMessage = "Username and Password is Incorrect!"
        })
    }

  }
}
