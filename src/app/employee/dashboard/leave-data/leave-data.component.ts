import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../service/index'
@Component({
  selector: 'app-leave-data',
  templateUrl: './leave-data.component.html',
  styleUrls: ['./leave-data.component.scss']
})
export class LeaveDataComponent implements OnInit {

  employee: any;
  source: LocalDataSource
  data: any;
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeservice: EmployeeService) {
    this.employee = JSON.parse(localStorage.employee).username
    this.source = new LocalDataSource(this.data);
    this.employeeservice.getEmployeeLeaveDetails(this.employee).subscribe((res: any) => {
      this.data = res
      this.source = new LocalDataSource(this.data);
      this.show = false;
    })
  }

  ngOnInit(): void {
  }

  settings = {
    columns: {
      EMPLOYEENO: {
        title: 'EMPLOYEE_NO',
        filter: false,
      },
      ABSENCETYPE: {
        title: 'ABSENCE_TYPE',
        filter: false,
      },
      NAMEOFABSENCETYPE: {
        title: 'NAME_OF_ABSENCE_TYPE',
        filter: false,
      },
      VALIDBEGIN: {
        title: 'VALID_BEGIN',
        filter: false,
      },
      VALIDEND: {
        title: 'VALID_END',
        filter: false,
      },
      ABSENCEDAYS: {
        title: 'ABSENCE_DAYS',
        filter: false,
      },
      ABSENCEHOURS: {
        title: 'ABSENCE_HOURS',
        filter: false,
      },
    },
    attr: {
      class: 'table table-bordered'
    },
    actions: false,
    pager: {
      perPage: 100,
    },
    hideSubHeader: true,
    mode: 'inline',
  };


  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to inclue in the search
      {
        field: 'ABSENCEDAYS',
        search: query,
      },
      {
        field: 'ABSENCEHOURS',
        search: query,
      },
      {
        field: 'ABSENCETYPE',
        search: query,
      },
      {
        field: 'EMPLOYEENO',
        search: query,
      },
      {
        field: 'NAMEOFABSENCETYPE',
        search: query,
      },
      {
        field: 'VALIDBEGIN',
        search: query,
      },
      {
        field: 'VALIDEND',
        search: query,
      },
    ], false);
  }

}
