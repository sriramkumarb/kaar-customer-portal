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
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.user = JSON.parse(localStorage.vendor).username;

    this.source = new LocalDataSource(this.data);

    this.vendorservice.getgrlist(this.user).subscribe((res: any) => {
      console.log(res);

      this.data = res

      this.source = new LocalDataSource(this.data);
      this.show = false;
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
        title: 'Vendor id',
        filter: false,
      },
      MBLNR: {
        title: 'Material Document No',
        filter: false,
      },
      MJAHR: {
        title: 'Mat Doc Year',
        filter: false,
      },
      WERKS: {
        title: 'Plant',
        filter: false,
      },
      CHARG: {
        title: 'Batch',
        filter: false,
      },
      DMBTR: {
        title: 'Amount',
        filter: false,
      },
      EBELN: {
        title: 'Document No',
        filter: false,
      },
      LGORT: {
        title: 'Location',
        filter: false,
      },
      MATNR: {
        title: 'Material No',
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
