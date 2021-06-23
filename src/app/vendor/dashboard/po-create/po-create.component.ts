import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
@Component({
  selector: 'app-po-create',
  templateUrl: './po-create.component.html',
  styleUrls: ['./po-create.component.scss']
})
export class PoCreateComponent implements OnInit {

  MATERIAL = ''
  PLANT = ''
  PO_ITEM = ''
  PURCHASE_GRP = ''
  PURCHASE_ORG = ''
  COMPANY_CODE = ''
  QUANTITY = ''
  SHORT_TEXT = ''
  CREATEDBY = ''
  DOC_DATE = ''
  DELIVERY_DATE = ''
  result = ''
  show = false

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorservice: VendorService) {

  }

  ngOnInit(): void {
  }

  createpo(data: any) {
    data.VEND_ID = '0000010068'
    data.COMPANY_CODE = 'SA01'
    data.PLANT = 'ZAJ7'
    data.MATERIAL = '1234ZAJ7'
    data.PURCHASE_ORG = 'ZAJ7'
    data.CREATEDBY = 'ABAPER'

    this.vendorservice.createpo(data).subscribe((res: any) => {
      this.result = res
      this.show = true
    })
  }

}
