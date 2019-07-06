import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PieService } from '../pie.service';
import { PieDto } from '../pie.dto';

@Component({
  selector: 'app-new-pie',
  templateUrl: './new-pie.component.html',
  styleUrls: ['./new-pie.component.css']
})
export class NewPieComponent implements OnInit {

  pieForm: FormGroup;
  loaded = false;

  constructor(private fb: FormBuilder, private pieservice: PieService) { }


  ngOnInit() {
    this.pieForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      files: [null]
    });
  }

  get name() {
    return this.pieForm.get('name');
  }
  get description() {
    return this.pieForm.get('description');
  }
  get price() {
    return this.pieForm.get('price');
  }

  onFileChange($event) {

    this.pieForm.patchValue({
      files: $event.target.files
    });
  }

  onSubmit() {
    const { name, description, price, files } = this.pieForm.value;

    const payload = new FormData();
    payload.append('name', name);
    payload.append('description', description);
    payload.append('price', price);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        payload.append('files', files[i]);
      }
    }

    this.pieservice.addNewPie(payload).subscribe(res => console.log(res));
  }

}
