import { Component, OnInit, ViewChild } from '@angular/core';
import { PieService } from '../pie.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-list-pies',
  templateUrl: './list-pies.component.html',
  styleUrls: ['./list-pies.component.css']
})
export class ListPiesComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;
  page = 1;
  skip = 10;
  pies: any[];
  finished = false;
  constructor(private pieservice: PieService) { }

  ngOnInit() {
    this.pieservice.getAllPies(this.page, this.skip).subscribe(res => {
      this.pies = [...res.data];
      console.log(this.pies);
    });
  }

  pushItems() {
    this.pieservice.getAllPies(this.page, this.skip).subscribe(res => {
      if (res.data.length < 5) { return; }
      this.pies = [...this.pies, ...res.data];
      console.log(this.pies);
    });
  }

  getNextPage(e) {
    const bottom = this.viewport.measureScrollOffset('bottom');
    if (bottom < 100) {
      this.page++;
      this.pushItems();
    }
  }
}
