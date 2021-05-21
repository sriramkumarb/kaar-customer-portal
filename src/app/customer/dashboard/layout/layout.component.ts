import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/index'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isMenuOpen = true;
  contentMargin = 240;

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService) { }

  ngOnInit(): void {
  }

  customerDetails() {
    this.router.navigate(['./customer-details'], { relativeTo: this.activatedRoute });
  }

  logout() {
    this.userservice.logout()
    this.router.navigate(['/cus-portal/login'])
    location.reload()
    console.log('done')
  }

}
