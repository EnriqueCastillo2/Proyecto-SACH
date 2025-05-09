import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { HuespedRequest, HuespedResponse } from '../huesped.model';
import { HuespedService } from '../huesped.service';

@Component({
  selector: 'app-huesped',
  imports: [CommonModule,MatGridListModule],
  templateUrl: './huesped.component.html',
  styleUrl: './huesped.component.css'
})
export class HuespedComponent implements OnInit {
  
  huespedRequest: HuespedRequest[] = [];
  huespedResponse: HuespedResponse[] = [];

constructor(private huespedService: HuespedService){}
 

  ngOnInit() {
    this.cargarHuesped();
  }

 


cargarHuesped() {
  this.huespedService.getHuesped().subscribe((huesped) => {
    this.huespedResponse = huesped;
    console.log(this.huespedRequest);
  });

}
}
