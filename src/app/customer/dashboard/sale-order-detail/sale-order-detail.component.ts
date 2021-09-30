import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';
@Component({
  selector: 'app-sale-order-detail',
  templateUrl: './sale-order-detail.component.html',
  styleUrls: ['./sale-order-detail.component.scss']
})
export class SaleOrderDetailComponent implements OnInit {

  source: LocalDataSource;
  salesDataNumber: any = '';
  data: any = [];
  header_data: any = ''
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.salesDataNumber = this.activatedRoute.snapshot.params.vbeln;

    this.source = new LocalDataSource(this.data);

    this.userService.getsaleorderdetails(this.salesDataNumber).subscribe((res: any) => {

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
        title: 'Document No',
        filter: false
      },
      SHORT_TEXT: {
        title: 'Name',
        filter: false
      },
      MATERIAL: {
        title: 'Material',
        filter: false
      },
      ITM_NUMBER: {
        title: 'Item Number',
        filter: false
      },
      ITEM_CATEG: {
        title: 'Item Category',
        filter: false
      },
      NET_PRICE: {
        title: 'Net Price',
        filter: false
      },
      NET_VALUE: {
        title: 'Net Value',
        filter: false
      },
      CURRENCY: {
        title: 'Currency',
        filter: false
      },
      DIVISION: {
        title: 'Division',
        filter: false
      },
      PLANT: {
        title: 'Plant',
        filter: false
      },
      TARGET_QU: {
        title: 'Target_QU',
        filter: false
      },
      UNIT_OF_WT: {
        title: 'Unit of Weight',
        filter: false
      },
      CREATED_BY: {
        title: 'Created By',
        filter: false
      },
      CREAT_DATE: {
        title: 'Created At',
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
        field: 'DOC_NUMBER',
        search: query
      },
      {
        field: 'SHORT_TEXT',
        search: query
      },
      {
        field: 'MATERIAL',
        search: query
      },
      {
        field: 'ITM_NUMBER',
        search: query
      },
      {
        field: 'ITEM_CATEG',
        search: query
      },
      {
        field: 'NET_PRICE',
        search: query
      },
      {
        field: 'NET_VALUE',
        search: query
      },
      {
        field: 'CURRENCY',
        search: query
      },
      {
        field: 'DIVISION',
        search: query
      },
      {
        field: 'PLANT',
        search: query
      },
      {
        field: 'TARGET_QU',
        search: query
      },
      {
        field: 'UNIT_OF_WT',
        search: query
      },
      {
        field: 'CREATED_BY',
        search: query
      },
      {
        field: 'CREAT_DATE',
        search: query
      }
    ], false);
  }


}
