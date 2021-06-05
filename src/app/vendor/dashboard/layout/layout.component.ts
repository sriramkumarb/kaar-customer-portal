import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/index'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) { }

  ngOnInit(): void {
  }

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

  vendorDetails() {
    this.router.navigate(['./vendor-details'], { relativeTo: this.activatedRoute })
  }

  logout() {
    this.vendorservice.logout()
    this.router.navigate(['/ven-portal/login'])
    location.reload()
  }

}
