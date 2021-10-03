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
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.user = JSON.parse(localStorage.user).username

    this.source = new LocalDataSource(this.credit_data)

    this.userService.getcreditmemo(this.user).subscribe((res: any) => {
      // console.log(res)
      this.credit_data = res
      this.source = new LocalDataSource(this.credit_data)
      this.show = false;
    })
  }

  ngOnInit(): void {
  }

  enablecredit() {
    console.log('credit');
    this.credit = true;
    this.show = true;
    this.userService.getcreditmemo(this.user).subscribe((res: any) => {
      // console.log(res)
      this.credit_data = res
      this.source = new LocalDataSource(this.credit_data)
      this.show = false;
    })
  }

  enabledebit() {
    console.log('debit');
    this.credit = false;
    this.show = true;
    this.userService.getdebitmemo(this.user).subscribe((res: any) => {
      // console.log(res)
      this.debit_data = res
      console.log('debit', this.debit_data);

      this.source = new LocalDataSource(this.debit_data)
      this.show = false;
    })
  }

  settings = {
    columns: {
      KUNNR: {
        title: 'Customer No',
        filter: false
      },
      BELNR: {
        title: 'Accounting Document No',
        filter: false
      },
      // VBELN: {
      //   title: 'VBELN',
      //   filter: false
      // },
      // VBEL2: {
      //   title: 'VBEL2',
      //   filter: false
      // },
      AUGBL: {
        title: 'Clearing Document No',
        filter: false
      },
      // BSCHL: {
      //   title: 'BSCHL',
      //   filter: false
      // },
      BUKRS: {
        title: 'Company Code',
        filter: false
      },
      BUZEI: {
        title: 'Line Item No',
        filter: false
      },
      // FDTAG: {
      //   title: 'FDTAG',
      //   filter: false
      // },
      GJAHR: {
        title: 'Fiscal Year',
        filter: false
      },
      // KOART: {
      //   title: 'KOART',
      //   filter: false
      // },
      KOKRS: {
        title: 'Controlling Area',
        filter: false
      },
      // POSN2: {
      //   title: 'POSN2',
      //   filter: false
      // },
      // PSWBT: {
      //   title: 'PSWBT',
      //   filter: false
      // },
      PSWSL: {
        title: 'Currency Type',
        filter: false
      },
      SHKZG: {
        title: 'Debit/Credit Indicator',
        filter: false
      },
      // WMWST: {
      //   title: 'WMWST',
      //   filter: false
      // },
      WRBTR: {
        title: 'Amount',
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
