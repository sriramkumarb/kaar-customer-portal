import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../service/index'
@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.scss']
})
export class PaySlipComponent implements OnInit {

  employee: any
  source: LocalDataSource
  data: any = [];
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeservice: EmployeeService) {
    this.employee = JSON.parse(localStorage.employee).username
    this.source = new LocalDataSource(this.data);
    this.employeeservice.getSalaryPaySlip(this.employee).subscribe((res: any) => {
      if (typeof (res.length) === 'number') {
        for (var i in res) {
          this.data.push(res[i]);
        }
      } else {
        this.data.push(res);
      }
      this.source = new LocalDataSource(this.data);
      this.show = false;
    })
  }

  ngOnInit(): void {
  }

  onUserSelected(event: any) {
    this.router.navigate(['./detail', event.data.SEQUENCENUMBER], { relativeTo: this.activatedRoute })

  }

  settings = {
    columns: {
      FPPERIOD: {
        title: 'FP_PERIOD',
        filter: false,
      },
      SEQUENCENUMBER: {
        title: 'SEQUENCE_NUMBER',
        filter: false,
      },
      PAYTYPE_TEXT: {
        title: 'PAYTYPE_TEXT',
        filter: false,
      },
      PAYDATE: {
        title: 'PAY_DATE',
        filter: false,
      },
      PAYID: {
        title: 'PAY_ID',
        filter: false,
      },
      PAYTYPE: {
        title: 'PAY_TYPE',
        filter: false,
      },
      FPBEGIN: {
        title: 'FP_BEGIN',
        filter: false,
      },
      FPEND: {
        title: 'FP_END',
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
        field: 'FPPERIOD',
        search: query,
      },
      {
        field: 'SEQUENCENUMBER',
        search: query,
      },
      {
        field: 'PAYTYPE_TEXT',
        search: query,
      },
      {
        field: 'PAYTYPE',
        search: query,
      },
      {
        field: 'PAYID',
        search: query,
      },
      {
        field: 'PAYDATE',
        search: query,
      },
      {
        field: 'FPBEGIN',
        search: query,
      },
      {
        field: 'FPEND',
        search: query,
      },
    ], false);
  }

}
