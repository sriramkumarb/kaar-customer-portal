import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  user: string = '';
  payment_data: any = []
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {

    this.user = JSON.parse(localStorage.user).username

    this.source = new LocalDataSource(this.payment_data);

    this.userService.getpaymentaging(this.user).subscribe((res: any) => {
      this.payment_data = res;
      this.source = new LocalDataSource(this.payment_data);
    })

  }

  ngOnInit(): void {
  }

  settings = {
    columns: {
      CUSTOMER: {
        title: 'CUSTOMER',
        filter: false,
      },
      COMP_CODE: {
        title: 'COMP_CODE',
        filter: false,
      },
      FISC_YEAR: {
        title: 'FISC_YEAR',
        filter: false,
      },
      DOC_NO: {
        title: 'DOC_NO',
        filter: false,
      },
      ENTRY_DATE: {
        title: 'ENTRY_DATE',
        filter: false,
      },
      CURRENCY: {
        title: 'CURRENCY',
        filter: false,
      },
      REF_DOC_NO: {
        title: 'REF_DOC_NO',
        filter: false,
      },
      DOC_TYPE: {
        title: 'DOC_TYPE',
        filter: false,
      },
      BRANCH: {
        title: 'BRANCH',
        filter: false,
      },
      BLINE_DATE: {
        title: 'BLINE_DATE',
        filter: false,
      },
      AMOUNT: {
        title: 'AMOUNT',
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
        field: 'COMP_CODE',
        search: query,
      },
      {
        field: 'CUSTOMER',
        search: query,
      },
      {
        field: 'FISC_YEAR',
        search: query,
      },
      {
        field: 'DOC_NO',
        search: query,
      },
      {
        field: 'ENTRY_DATE',
        search: query,
      },
      {
        field: 'CURRENCY',
        search: query,
      },
      {
        field: 'REF_DOC_NO',
        search: query,
      },
      {
        field: 'DOC_TYPE',
        search: query,
      },
      {
        field: 'BRANCH',
        search: query,
      },
      {
        field: 'BLINE_DATE',
        search: query,
      },
      {
        field: 'AMOUNT',
        search: query,
      },
    ], false);
  }

}
