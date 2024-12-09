import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private databaseURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/data.json"
  constructor(private http:HttpClient){}

  getDatas(){
    return this.http.get(this.databaseURL)
  }
}
