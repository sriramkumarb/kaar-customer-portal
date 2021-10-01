import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../service/index'
@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})
export class EmpDetailsComponent implements OnInit {

  employee: any = '';
  empDetails: any = '';
  disable = true;
  error_msg: any = ''
  res_status: any = ''
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeservice: EmployeeService) {
    this.employee = JSON.parse(localStorage.employee).username
  }

  ngOnInit(): void {
    this.employeeservice.getEmployeeDetails(this.employee).subscribe((res: any) => {
      this.empDetails = res
      this.show = false;
    })
  }

  enableEdit() {
    this.disable = !this.disable
  }

  updateEmployeeDetails(data: any) {
    this.employeeservice.editEmployeeDetails(data).subscribe((res: any) => {
      if (res.TYPE === 'S') {
        this.res_status = res.MESSAGE + ' Successfully!'
      } else {
        this.error_msg = 'Error Occured While Updating!'
      }

    })

  }

}
