import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';
@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  user: string = '';
  delivery_data: any = []
  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.user = JSON.parse(localStorage.user).username


    this.source = new LocalDataSource(this.delivery_data);

    this.userService.getdeliverylist(this.user).subscribe((res: any) => {
      this.delivery_data = res
      this.source = new LocalDataSource(this.delivery_data);
    })

  }

  ngOnInit(): void {
  }

  settings = {
    columns: {
      KUNNR: {
        title: 'Customer Number',
        filter: false,
      },
      VBTYP: {
        title: 'Sales Document Type',
        filter: false,
      },
      VBELN: {
        title: 'Sales Document Number',
        filter: false,
      },
      AUDAT: {
        title: 'Document Date',
        filter: false
      },
      WAERK: {
        title: 'SD Document Currency',
        filter: false
      },
      VKORG: {
        title: 'Sales Organization',
        filter: false
      },
      VTWEG: {
        title: 'Distribution Channel',
        filter: false
      },
      SPART: {
        title: 'Division',
        filter: false
      },
      BSTNK: {
        title: 'Purchase order number',
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
      // fields we want to inclue in the search
      {
        field: 'KUNNR',
        search: query,
      },
      {
        field: 'VBTYP',
        search: query,
      },
      {
        field: 'VBELN',
        search: query,
      },
      {
        field: 'AUDAT',
        search: query,
      },
      {
        field: 'WAERK',
        search: query,
      },
      {
        field: 'VKORG',
        search: query,
      }, {
        field: 'VTWEG',
        search: query,
      },
      {
        field: 'SPART',
        search: query,
      },
      {
        field: 'BSTNK',
        search: query,
      },
    ], false);
  }

}
