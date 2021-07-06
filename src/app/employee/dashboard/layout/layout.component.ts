import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../service/index'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeservice: EmployeeService) { }

  ngOnInit(): void {
  }

  isMenuOpen = false;
  contentMargin = 70;

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  employeeDetails() {
    this.router.navigate(['./employee-details'], { relativeTo: this.activatedRoute })
  }

  logout() {
    this.employeeservice.logout()
    this.router.navigate(['/emp-portal/login'])
    location.reload()

  }

}
