import { Component } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  Datas:any=[]

  constructor(
    private base:BaseService
  ){
    this.base.getDatas().subscribe(
      (res)=>this.Datas=res
    )
  }
}
