import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';

@Component({
  selector: 'app-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.scss']
})
export class SaleOrderComponent implements OnInit {

  url: any = '';
  user: string = '';
  saleorder_data: any = []
  source: LocalDataSource;
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.user = JSON.parse(localStorage.user).username

    this.source = new LocalDataSource(this.saleorder_data);

    this.userService.getsaleorderlist(this.user).subscribe((res: any) => {
      this.saleorder_data = res
      this.source = new LocalDataSource(this.saleorder_data);
      this.show = false;
    })

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

  ngOnInit(): void {
  }

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
    ], false);
  }

  onUserSelected(event: any) {
    this.router.navigate(['./detail', event.data.VBELN], { relativeTo: this.activatedRoute })

  }


}
