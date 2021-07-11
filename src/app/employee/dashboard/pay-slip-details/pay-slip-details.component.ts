import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../service/index'
@Component({
  selector: 'app-pay-slip-details',
  templateUrl: './pay-slip-details.component.html',
  styleUrls: ['./pay-slip-details.component.scss']
})
export class PaySlipDetailsComponent implements OnInit {

  employee: any
  SEQUENCENUMBER: any
  base64_data: any = ''
  src: any = ''
  show: any = true;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeservice: EmployeeService) {
    this.employee = JSON.parse(localStorage.employee).username
    this.SEQUENCENUMBER = this.activatedRoute.snapshot.params.SEQUENCENUMBER;
    this.employeeservice.getSalaryPaySlipDetails([this.employee, this.SEQUENCENUMBER]).subscribe((res: any) => {

      this.base64_data = res

      this.src = this._base64ToArrayBuffer(this.base64_data)

      this.show = false

    })
  }

  ngOnInit(): void {
  }

  onClickDownloadPdf() {
    let base64String = this.base64_data;
    let name = this.employee + '-' + this.SEQUENCENUMBER
    this.downloadPdf(base64String, name);
  }

  downloadPdf(base64String: any, fileName: any) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  _base64ToArrayBuffer(base64: any) {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

}
