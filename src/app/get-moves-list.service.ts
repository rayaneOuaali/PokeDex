import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetMovesListService {

  constructor(private http: HttpClient) { }
  getMovesList(text: string, page: number): Observable<any> {
    return this.http.get(`https://api-dex-nine.vercel.app/moves?name=${text}&lang=fr&page=${page}&pageSize=50`)
  }
}
