import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-inquiry-data',
  templateUrl: './inquiry-data.component.html',
  styleUrls: ['./inquiry-data.component.scss']
})
export class InquiryDataComponent implements OnInit {

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
  ];

  settings = {
    columns: {
      id: {
        title: 'ID',
        filter: false,
      },
      name: {
        title: 'Full Name',
        filter: false,
      },
      username: {
        title: 'User Name',
        filter: false,
      },
      email: {
        title: 'Email',
        filter: false,
      },
    },
    attr: {
      class: 'table table-bordered'
    },
    actions: {
      position: 'right',
      edit: false
    },
    pager: {
      perPage: 100,
    },
    delete: {
      deleteButtonContent: '<img src="assets/images/nb-trash.svg" width="40" height="35" >',
      confirmDelete: false,
    },
    hideSubHeader: true,
    mode: 'inline',
  };

  source: LocalDataSource;

  constructor() {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit(): void {
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to inclue in the search
      {
        field: 'id',
        search: query,
      },
      {
        field: 'name',
        search: query,
      },
      {
        field: 'username',
        search: query,
      },
      {
        field: 'email',
        search: query,
      },
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

}
