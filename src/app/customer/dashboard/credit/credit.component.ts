import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {

  credit = true;
  user: string = '';
  credit_data: any = [];
  debit_data: any = [];
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.user = JSON.parse(localStorage.user).username

    this.source = new LocalDataSource(this.credit_data)

    this.userService.getcreditmemo(this.user).subscribe((res: any) => {
      // console.log(res)
      this.credit_data = res
      this.source = new LocalDataSource(this.credit_data)
    })
  }

  ngOnInit(): void {
  }

  enablecredit() {
    console.log('credit');
    this.credit = true;
    this.userService.getcreditmemo(this.user).subscribe((res: any) => {
      // console.log(res)
      this.credit_data = res
      this.source = new LocalDataSource(this.credit_data)
    })
  }

  enabledebit() {
    console.log('debit');
    this.credit = false;
    this.userService.getdebitmemo(this.user).subscribe((res: any) => {
      // console.log(res)
      this.debit_data = res
      console.log('debit', this.debit_data);

      this.source = new LocalDataSource(this.debit_data)

    })
  }

  settings = {
    columns: {
      KUNNR: {
        title: 'KUNNR',
        filter: false
      },
      BELNR: {
        title: 'BELNR',
        filter: false
      },
      VBELN: {
        title: 'VBELN',
        filter: false
      },
      VBEL2: {
        title: 'VBEL2',
        filter: false
      },
      AUGBL: {
        title: 'AUGBL',
        filter: false
      },
      BSCHL: {
        title: 'BSCHL',
        filter: false
      },
      BUKRS: {
        title: 'BUKRS',
        filter: false
      },
      BUZEI: {
        title: 'BUZEI',
        filter: false
      },
      FDTAG: {
        title: 'FDTAG',
        filter: false
      },
      GJAHR: {
        title: 'GJAHR',
        filter: false
      },
      KOART: {
        title: 'KOART',
        filter: false
      },
      KOKRS: {
        title: 'KOKRS',
        filter: false
      },
      POSN2: {
        title: 'POSN2',
        filter: false
      },
      PSWBT: {
        title: 'PSWBT',
        filter: false
      },
      PSWSL: {
        title: 'PSWSL',
        filter: false
      },
      SHKZG: {
        title: 'SHKZG',
        filter: false
      },
      WMWST: {
        title: 'WMWST',
        filter: false
      },
      WRBTR: {
        title: 'WRBTR',
        filter: false
      }
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
      {
        field: 'AUGBL',
        search: query
      },
      {
        field: 'BELNR',
        search: query
      },
      {
        field: 'BSCHL',
        search: query
      },
      {
        field: 'BUKRS',
        search: query
      },
      {
        field: 'BUZEI',
        search: query
      },
      {
        field: 'FDTAG',
        search: query
      },
      {
        field: 'GJAHR',
        search: query
      },
      {
        field: 'CURRENCY',
        search: query
      },
      {
        field: 'KOART',
        search: query
      },
      {
        field: 'KOKRS',
        search: query
      },
      {
        field: 'KUNNR',
        search: query
      },
      {
        field: 'POSN2',
        search: query
      },
      {
        field: 'PSWBT',
        search: query
      },
      {
        field: 'PSWSL',
        search: query
      },
      {
        field: 'SHKZG',
        search: query
      },
      {
        field: 'VBEL2',
        search: query
      },
      {
        field: 'VBELN',
        search: query
      },
      {
        field: 'WMWST',
        search: query
      },
      {
        field: 'WRBTR',
        search: query
      },
    ], false);
  }

}
