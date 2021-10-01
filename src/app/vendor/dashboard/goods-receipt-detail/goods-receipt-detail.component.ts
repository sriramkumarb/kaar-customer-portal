import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/index'
@Component({
  selector: 'app-goods-receipt-detail',
  templateUrl: './goods-receipt-detail.component.html',
  styleUrls: ['./goods-receipt-detail.component.scss']
})
export class GoodsReceiptDetailComponent implements OnInit {

  source: LocalDataSource;
  year: any = ''
  number: any = ''
  header_data: any = []
  data: any = []
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.year = this.activatedRoute.snapshot.params.mjahr
    this.number = this.activatedRoute.snapshot.params.mblnr

    this.source = new LocalDataSource(this.data);

    this.vendorservice.getgrdet([this.year, this.number]).subscribe((res: any) => {
      console.log(res);
      this.header_data = res.header

      this.data.push(res.item);

      this.source = new LocalDataSource(this.data);
      this.show = false;
    })
  }

  ngOnInit(): void {
  }

  settings = {
    columns: {
      VENDOR: {
        title: 'VENDOR',
        filter: false
      },
      MAT_DOC: {
        title: 'MAT_DOC',
        filter: false
      },
      DOC_YEAR: {
        title: 'DOC_YEAR',
        filter: false
      },
      MATDOC_ITM: {
        title: 'MATDOC_ITM',
        filter: false
      },
      MATERIAL: {
        title: 'MATERIAL',
        filter: false
      },
      PLANT: {
        title: 'PLANT',
        filter: false
      },
      ENTRY_QNT: {
        title: 'ENTRY_QNT',
        filter: false
      },
      ENTRY_UOM: {
        title: 'ENTRY_UOM',
        filter: false
      },
      MOVE_TYPE: {
        title: 'MOVE_TYPE',
        filter: false
      },
      ORDERPR_UN: {
        title: 'ORDERPR_UN',
        filter: false
      },
      PO_ITEM: {
        title: 'PO_ITEM',
        filter: false
      },
      PO_NUMBER: {
        title: 'PO_NUMBER',
        filter: false
      },
      PO_PR_QNT: {
        title: 'PO_PR_QNT',
        filter: false
      },
      STGE_LOC: {
        title: 'STGE_LOC',
        filter: false
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
      {
        field: 'DOC_YEAR',
        search: query
      },
      {
        field: 'ENTRY_QNT',
        search: query
      },
      {
        field: 'ENTRY_UOM',
        search: query
      },
      {
        field: 'MATDOC_ITM',
        search: query
      },
      {
        field: 'MATERIAL',
        search: query
      },
      {
        field: 'MAT_DOC',
        search: query
      },
      {
        field: 'MOVE_TYPE',
        search: query
      },
      {
        field: 'ORDERPR_UN',
        search: query
      },
      {
        field: 'PLANT',
        search: query
      },
      {
        field: 'PO_ITEM',
        search: query
      },
      {
        field: 'PO_NUMBER',
        search: query
      },
      {
        field: 'PO_PR_QNT',
        search: query
      },
      {
        field: 'STGE_LOC',
        search: query
      },
      {
        field: 'VENDOR',
        search: query
      },
    ], false);
  }


}
