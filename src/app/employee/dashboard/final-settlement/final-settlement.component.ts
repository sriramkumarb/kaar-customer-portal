import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/index'

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
  wage_headers = ["WAGETYPE", "AMOUNT", "NAMEOFWAGETYPE"]
  PPBWLA_headers = ["LGART", "WAERS", "INFTY", "BEGDA", "ENDDA", "BETRG"]
  constructor(private employeeservice: EmployeeService) {
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
          console.log(res)

        })
      }
      else {
        console.log('Not a Current Employee');

      }
    })
  }

  ngOnInit(): void {
  }

}
