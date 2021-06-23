import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  user: string = '';
  data: any = []
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.user = JSON.parse(localStorage.vendor).username;

    this.source = new LocalDataSource(this.data);
    this.vendorservice.getpolist(this.user).subscribe((res: any) => {

      this.data = res

      this.source = new LocalDataSource(this.data);

    })
  }

  ngOnInit(): void {
  }

  onUserSelected(event: any) {
    this.router.navigate(['./detail', event.data.EBELN], { relativeTo: this.activatedRoute })
  }

  settings = {
    columns: {
      LIFNR: {
        title: 'LIFNR',
        filter: false,
      },
      EBELN: {
        title: 'EBELN',
        filter: false,
      },
      BSTYP: {
        title: 'BSTYP',
        filter: false,
      },
      BUKRS: {
        title: 'BUKRS',
        filter: false,
      },
      EKGRP: {
        title: 'EKGRP',
        filter: false,
      },
      EKORG: {
        title: 'EKORG',
        filter: false,
      },
      ERNAM: {
        title: 'ERNAM',
        filter: false,
      },
      BSART: {
        title: 'BSART',
        filter: false,
      },
      PINCR: {
        title: 'PINCR',
        filter: false,
      },
      SPRAS: {
        title: 'SPRAS',
        filter: false,
      },
      WAERS: {
        title: 'WAERS',
        filter: false,
      },
      BSAKZ: {
        title: 'BSAKZ',
        filter: false,
      },
      AEDAT: {
        title: 'AEDAT',
        filter: false,
      },
      STATU: {
        title: 'STATU',
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
        field: 'AEDAT',
        search: query,
      },
      {
        field: 'BSAKZ',
        search: query,
      },
      {
        field: 'BSTYP',
        search: query,
      },
      {
        field: 'BUKRS',
        search: query,
      },
      {
        field: 'EBELN',
        search: query,
      },
      {
        field: 'EKGRP',
        search: query,
      },
      {
        field: 'EKORG',
        search: query,
      },
      {
        field: 'ERNAM',
        search: query,
      },
      {
        field: 'LIFNR',
        search: query,
      },
      {
        field: 'BSART',
        search: query,
      },
      {
        field: 'LOEKZ',
        search: query,
      },
      {
        field: 'WAERS',
        search: query,
      },
      {
        field: 'PINCR',
        search: query,
      },
      {
        field: 'MANDT',
        search: query,
      },
      {
        field: 'STATU',
        search: query,
      },
    ], false);
  }


}
