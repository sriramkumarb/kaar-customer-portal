import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss']
})
export class InvoicePdfComponent implements OnInit {

  user: string = '';
  number: string = '';
  year: string = '';
  base64_data: any = ''
  src: any = ''
  show: any = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {
    this.user = JSON.parse(localStorage.vendor).username;
    this.year = this.activatedRoute.snapshot.params.FISC_YEAR
    this.number = this.activatedRoute.snapshot.params.INV_DOC_NO

    this.vendorservice.getinvpdf([this.user, this.number, this.year]).subscribe((res: any) => {
      // console.log(res)

      this.base64_data = res.data
      // console.log(this.base64_data);

      this.src = this._base64ToArrayBuffer(this.base64_data)

      this.show = false

    })
  }

  ngOnInit(): void {
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
