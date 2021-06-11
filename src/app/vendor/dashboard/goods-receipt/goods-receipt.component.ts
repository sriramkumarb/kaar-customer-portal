import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.scss']
})
export class GoodsReceiptComponent implements OnInit {

  user: string = '';
  data: any = []
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.user = JSON.parse(localStorage.vendor).username;

    this.source = new LocalDataSource(this.data);

    this.vendorservice.getgrlist(this.user).subscribe((res: any) => {
      console.log(res);

      this.data = res

      this.source = new LocalDataSource(this.data);

    })
  }

  ngOnInit(): void {
  }

  onUserSelected(event: any) {
    this.router.navigate(['./detail', event.data.MBLNR, event.data.MJAHR], { relativeTo: this.activatedRoute })

  }

  settings = {
    columns: {
      LIFNR: {
        title: 'LIFNR',
        filter: false,
      },
      MBLNR: {
        title: 'MBLNR',
        filter: false,
      },
      MJAHR: {
        title: 'MJAHR',
        filter: false,
      },
      WERKS: {
        title: 'WERKS',
        filter: false,
      },
      CHARG: {
        title: 'CHARG',
        filter: false,
      },
      DMBTR: {
        title: 'DMBTR',
        filter: false,
      },
      EBELN: {
        title: 'EBELN',
        filter: false,
      },
      LGORT: {
        title: 'LGORT',
        filter: false,
      },
      MATNR: {
        title: 'MATNR',
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
        field: 'CHARG',
        search: query,
      },
      {
        field: 'DMBTR',
        search: query,
      },
      {
        field: 'EBELN',
        search: query,
      },
      {
        field: 'LGORT',
        search: query,
      },
      {
        field: 'LIFNR',
        search: query,
      },
      {
        field: 'MATNR',
        search: query,
      },
      {
        field: 'MBLNR',
        search: query,
      },
      {
        field: 'MJAHR',
        search: query,
      },
      {
        field: 'WERKS',
        search: query,
      },
    ], false);
  }

}
