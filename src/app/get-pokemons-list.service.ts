import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetPokemonsListService {

  constructor(private http: HttpClient) { }
  getPokemonsList(text: string, page: number, forms: boolean): Observable<any> {
    return this.http.get(`https://api-dex-nine.vercel.app/pokemon?name=${text}&lang=fr&page=${page}&pageSize=50&withForms=${forms}`)
  }

  getPokemonsByMoveId(moveId: number): Observable<any> {
    return this.http.get(`https://api-dex-nine.vercel.app/moves/${moveId}/pokemons?lang=fr`)
  }
}
