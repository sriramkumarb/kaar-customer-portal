import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/index'
@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.scss']
})
export class QuotationDetailComponent implements OnInit {

  source: LocalDataSource;
  number: any = ''
  header_data: any = []
  data: any = []
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.number = this.activatedRoute.snapshot.params.ebeln;

    this.source = new LocalDataSource(this.data);

    this.vendorservice.getrqdet(this.number).subscribe((res: any) => {
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
      DOC_NUMBER: {
        title: 'DOC_NUMBER',
        filter: false
      },
      DOC_ITEM: {
        title: 'DOC_ITEM',
        filter: false
      },
      CO_CODE: {
        title: 'CO_CODE',
        filter: false
      },
      SHORT_TEXT: {
        title: 'SHORT_TEXT',
        filter: false
      },
      STATUS: {
        title: 'STATUS',
        filter: false
      },
      CHANGED_ON: {
        title: 'CHANGED_ON',
        filter: false
      },
      GROS_VALUE: {
        title: 'GROS_VALUE',
        filter: false
      },
      MATERIAL: {
        title: 'MATERIAL',
        filter: false
      },
      NET_PRICE: {
        title: 'NET_PRICE',
        filter: false
      },
      QUOT_DEAD: {
        title: 'QUOT_DEAD',
        filter: false
      },
      TARGET_QTY: {
        title: 'TARGET_QTY',
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
        field: 'CHANGED_ON',
        search: query
      },
      {
        field: 'CO_CODE',
        search: query
      },
      {
        field: 'DOC_ITEM',
        search: query
      },
      {
        field: 'DOC_NUMBER',
        search: query
      },
      {
        field: 'GROS_VALUE',
        search: query
      },
      {
        field: 'MATERIAL',
        search: query
      },
      {
        field: 'NET_PRICE',
        search: query
      },
      {
        field: 'QUOT_DEAD',
        search: query
      },
      {
        field: 'SHORT_TEXT',
        search: query
      },
      {
        field: 'STATUS',
        search: query
      },
      {
        field: 'TARGET_QTY',
        search: query
      },
    ], false);
  }

}
