import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  user: string = '';
  data: any = []
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.user = JSON.parse(localStorage.vendor).username;

    this.source = new LocalDataSource(this.data);

    this.vendorservice.getinvlist(this.user).subscribe((res: any) => {
      console.log(res);

      this.data = res

      this.source = new LocalDataSource(this.data);

    })
  }

  ngOnInit(): void {
  }

  onUserSelected(event: any) {
    this.router.navigate(['./pdf', event.data.INV_DOC_NO, event.data.FISC_YEAR], { relativeTo: this.activatedRoute })

  }

  settings = {
    columns: {
      DIFF_INV: {
        title: 'VENDOR',
        filter: false,
      },
      INV_DOC_NO: {
        title: 'INV_DOC_NO',
        filter: false,
      },
      FISC_YEAR: {
        title: 'FISC_YEAR',
        filter: false,
      },
      COMP_CODE: {
        title: 'COMP_CODE',
        filter: false,
      },
      CURRENCY: {
        title: 'CURRENCY',
        filter: false,
      },
      DOC_DATE: {
        title: 'DOC_DATE',
        filter: false,
      },
      ENTRY_DATE: {
        title: 'ENTRY_DATE',
        filter: false,
      },
      ENTRY_TIME: {
        title: 'ENTRY_TIME',
        filter: false,
      },
      GROSS_AMNT: {
        title: 'GROSS_AMNT',
        filter: false,
      },
      PSTNG_DATE: {
        title: 'PSTNG_DATE',
        filter: false,
      },
      INVOICE_STATUS: {
        title: 'INVOICE_STATUS',
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
        field: 'CURRENCY',
        search: query,
      },
      {
        field: 'DIFF_INV',
        search: query,
      },
      {
        field: 'DOC_DATE',
        search: query,
      },
      {
        field: 'ENTRY_DATE',
        search: query,
      },
      {
        field: 'ENTRY_TIME',
        search: query,
      },
      {
        field: 'FISC_YEAR',
        search: query,
      },
      {
        field: 'GROSS_AMNT',
        search: query,
      },
      {
        field: 'INVOICE_STATUS',
        search: query,
      },
      {
        field: 'INV_DOC_NO',
        search: query,
      },
      {
        field: 'PSTNG_DATE',
        search: query,
      },
    ], false);
  }


}
