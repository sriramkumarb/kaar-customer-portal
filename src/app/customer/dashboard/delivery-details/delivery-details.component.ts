import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

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

    this.userService.getdeliverydetails(this.salesDataNumber).subscribe((res: any) => {

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
      VBELN: {
        title: 'Document No',
        filter: false
      },
      POSNR: {
        title: 'Delivery Item',
        filter: false
      },
      MATNR: {
        title: 'Material No',
        filter: false
      },
      BRGEW: {
        title: 'Gross weight',
        filter: false
      },
      CHARG: {
        title: 'Batch Number',
        filter: false
      },
      ERDAT: {
        title: 'Created at',
        filter: false
      },
      ERNAM: {
        title: 'Created by',
        filter: false
      },
      KDMAT: {
        title: 'Material Owner',
        filter: false
      },
      MATKL: {
        title: 'Material Group',
        filter: false
      },
      NTGEW: {
        title: 'Net weight',
        filter: false
      },
      VOLUM: {
        title: 'Volume',
        filter: false
      },
      VRKME: {
        title: 'Sales unit',
        filter: false
      },
      WERKS: {
        title: 'Plant',
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
        field: 'BRGEW',
        search: query
      },
      {
        field: 'CHARG',
        search: query
      },
      {
        field: 'ERDAT',
        search: query
      },
      {
        field: 'ERNAM',
        search: query
      },
      {
        field: 'KDMAT',
        search: query
      },
      {
        field: 'MATKL',
        search: query
      },
      {
        field: 'MATNR',
        search: query
      },
      {
        field: 'NTGEW',
        search: query
      },
      {
        field: 'POSNR',
        search: query
      },
      {
        field: 'VBELN',
        search: query
      },
      {
        field: 'VOLUM',
        search: query
      },
      {
        field: 'VRKME',
        search: query
      },
      {
        field: 'WERKS',
        search: query
      },
    ], false);
  }

}
