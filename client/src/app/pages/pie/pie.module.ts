import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ListPiesComponent } from './list-pies/list-pies.component';
import { NewPieComponent } from './new-pie/new-pie.component';
import { PieService } from './pie.service';


@NgModule({
  declarations: [ListPiesComponent, NewPieComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [PieService],
  exports: [ListPiesComponent, NewPieComponent]
})
export class PieModule { }
