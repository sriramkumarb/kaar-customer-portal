import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/index'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-final-settlement',
  templateUrl: './final-settlement.component.html',
  styleUrls: ['./final-settlement.component.scss']
})
export class FinalSettlementComponent implements OnInit {

  employee: any = '';
  details: any;
  wage_types: any
  PPBWLA_types: any
  detail_1: any
  detail_2: any
  display = "none";
  wage_headers = ["WAGETYPE", "AMOUNT", "NAMEOFWAGETYPE"]
  PPBWLA_headers = ["LGART", "WAERS", "INFTY", "BEGDA", "ENDDA", "BETRG"]
  constructor(private employeeservice: EmployeeService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.employee = JSON.parse(localStorage.employee).username
    this.employeeservice.getEmployeeDetails(this.employee).subscribe((res: any) => {
      let Status = res.STATUS;
      if (Status === 0) {
        console.log('called');
        this.employeeservice.getFinalSettlementDetails(this.employee).subscribe((res: any) => {
          this.wage_types = res.WAGETYPES.item
          this.PPBWLA_types = res.PPBWLA.item
          this.detail_1 = res.detail_1
          this.detail_2 = res.detail_2

        })
      }
      else {
        console.log('Not a Current Employee');
        this.openModal();
      }
    })
  }

  ngOnInit(): void {
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }

}
