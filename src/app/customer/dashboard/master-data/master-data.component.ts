import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

  data: any;
  error_message: any
  customer_number: any
  number: any = []
  show: any = false
  show1: any = false;
  json_data: any = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  excelRead(e: any) {

    try {
      const target: DataTransfer = <DataTransfer>(e.target);

      if (target.files.length !== 1) throw new Error('Cannot use multiple files');

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const bstr: string = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

        let columns = this.data[0]

        let rows = this.data.slice(1);

        for (var i = 0; i < rows.length; i++) {
          this.json_data.push(rows[i].reduce(function (result: any, field: any, index: any) {
            result[columns[index]] = field;
            return result;
          }, {}))
        }

        console.log(this.json_data);

        this.uploadinsap(this.json_data);
        this.show1 = true;
      };

      reader.readAsBinaryString(e.target.files[0]);


    } catch (error) {
      this.error_message = 'Cannot able to Process Mutiple Files, Select a Single File!'
    }

  }

  uploadinsap(data: any) {
    data.map((o: any) => {
      this.userService.uploadmasterdata(o).subscribe((res: any) => {
        this.customer_number = res
        this.number.push(res)
        this.show = true
        this.show1 = false;
      })
    })
  }



}
