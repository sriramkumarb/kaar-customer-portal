import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../service/index'
@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {

  employee: any = ''
  leave_types: any
  leave_quota: any
  show: any = true
  result: any = ''

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeservice: EmployeeService) {
    this.employee = JSON.parse(localStorage.employee).username
  }

  ngOnInit(): void {
    this.employeeservice.getEmployeeLeaveTypes(this.employee).subscribe((res: any) => {
      this.leave_types = res.leave_types
      this.leave_quota = res.leave_quota
      this.show = false
    })
  }

  onSubmit(formValue: any) {
    this.employeeservice.createEmployeeLeaveRequest(formValue).subscribe((res: any) => {
      this.result = res
    })
  }

}
