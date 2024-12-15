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
    // SVG betöltése
    
    this.http.get('/valami.svg', { responseType: 'text' }).subscribe((svg) => {
      this.svgContent = svg;
      this.setSvgSize();
      this.updateMap(); // Frissítés az SVG betöltése után
    });

    // Firebase adatok betöltése
    this.base.getDatas().subscribe((res) => {
      this.Datas = res;
      this.updateMap(); // Frissítés az adatok betöltése után
    });
  }
  updateMap(): void {
    if (!this.svgContent || this.Datas.length === 0) return;
  
    // Alapértelmezett szín minden ID-s elemre
    const svg = document.querySelector('svg');
    if (svg) {
      const paths = svg.querySelectorAll('[id]');
      paths.forEach((path) => {
        path.setAttribute('fill', '#32CD32'); // Minden elem színe szürke lesz alapértelmezetten
        console.log(path.id); // Ellenőrizze, hogy minden elem megjelenik-e a konzolon
      });
    }
  
    // Az SVG elemek színezése az adat alapján
    this.Datas.forEach((item: any) => {
      const region = document.getElementById(`${item.MEGYE_ID}`);
      if (region) {
        region.setAttribute('fill', this.getColor(item)); // Szín beállítása
      }
    });
  }
  
  getColor(item: any): string {
    return item.MEGYE === 'Fejér' ? '#32CD32' : '	#0000FF'; // Példa színezés
  }
  
  loadMap(): void {
    if (!this.svgContent || this.Datas.length === 0) return;

    const svg = document.querySelector('svg');
    if (svg) {
      // Töröljük a régi pontokat (ha vannak)
      const existingPoints = svg.querySelectorAll('circle');
      existingPoints.forEach((point) => point.remove());

      // Új pontok hozzáadása a településekhez
      this.Datas.forEach((item: any) => {
        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttribute('cx', item.coordX.toString());  // Koordináta X
        point.setAttribute('cy', item.coordY.toString());  // Koordináta Y
        point.setAttribute('r', '5');  // Pont sugara
        point.setAttribute('fill', this.getColor(item)); // Szín

        // Adjuk hozzá a SVG-hez
        svg.appendChild(point);
      });
    }
  }
  setSvgSize(): void {
    const svgElement = document.querySelector('svg');
    if (svgElement) {
      // Beállítjuk a fix szélességet és magasságot, ha szükséges
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
    }
  }
}


