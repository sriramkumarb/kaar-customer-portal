import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';
@Component({
  selector: 'app-inquiry-data',
  templateUrl: './inquiry-data.component.html',
  styleUrls: ['./inquiry-data.component.scss']
})
export class InquiryDataComponent implements OnInit {

  url: any = '';
  user: string = '';
  inquiry_data: any = []

  // data = [
  //   {
  //     id: 1,
  //     name: 'Leanne Graham',
  //     username: 'Bret',
  //     email: 'Sincere@april.biz',
  //   },
  //   {
  //     id: 2,
  //     name: 'Ervin Howell',
  //     username: 'Antonette',
  //     email: 'Shanna@melissa.tv',
  //   },
  //   {
  //     id: 3,
  //     name: 'Clementine Bauch',
  //     username: 'Samantha',
  //     email: 'Nathan@yesenia.net',
  //   },
  // ];

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

  source: LocalDataSource;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {

    this.user = JSON.parse(localStorage.user).username


    this.source = new LocalDataSource(this.inquiry_data);

    this.userService.getinquirylist(this.user).subscribe((res: any) => {
      this.inquiry_data = res
      this.source = new LocalDataSource(this.inquiry_data);
    })

  }

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
