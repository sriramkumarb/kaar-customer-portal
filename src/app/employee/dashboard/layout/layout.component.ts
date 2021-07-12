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

    let s = document.createElement('script');
    s.setAttribute('src', "https://cdn.cai.tools.sap/webchat/webchat.js");
    s.setAttribute('channelId', '32c162bb-2ed5-4e92-a03b-f61ad77b49ca');
    s.setAttribute('token', '854c865957abacc72165588790e97448');
    s.setAttribute('id', 'cai-webchat');
    document.body.appendChild(s);

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
