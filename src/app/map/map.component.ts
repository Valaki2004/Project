import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent  {
  svgContent: string = '';
  Datas: any = [];

  constructor(
    private base: BaseService,
    private http: HttpClient
  ) {    
    this.http.get('/valami.svg', { responseType: 'text' }).subscribe((svg) => {
      this.svgContent = svg;
      this.setSvgSize();
      this.updateMap(); 
    });
    this.base.getDatas().subscribe((res) => {
      this.Datas = res;
      this.updateMap();
    });
  }
  setSvgSize(): void {
    const svgElement = document.querySelector('svg');
    if (svgElement) {
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
    }
  }
  updateMap(): void {
    if (!this.svgContent || this.Datas.length === 0) return;
    const svg = document.querySelector('svg');
    if (svg) {
      const paths = svg.querySelectorAll('[id]');
      paths.forEach((path) => {
        console.log(path.id);
        const nmb = path.id
        let number = parseInt(typeof nmb)  
    if (number == 21){
     path.setAttribute('fill', '#32CD32') 
    } 
      });
    }
    this.Datas.forEach((item: any) => {
      const region = document.getElementById(`${item.MEGYE_ID}`);
      if (region) {
        region.setAttribute('fill', this.getColor(item)); 
      }
    });
  }
  getColor(item: any): string {
    return item.MEGYE === 'Somogy' ? '#32CD32' : '	#0000FF';
  } 
}


