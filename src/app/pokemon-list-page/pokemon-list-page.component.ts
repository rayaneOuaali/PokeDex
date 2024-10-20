import {Component, OnInit} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {PokemonListItemComponent} from "../pokemon-list-item/pokemon-list-item.component";
import {PokemonData} from "../../types/pokemon/pokemon-type";

@Component({
  selector: 'app-pokemon-list-page',
  standalone: true,
  imports: [
    MatPaginator,
    MatProgressSpinner,
    MatSlideToggle,
    FormsModule,
    NgOptimizedImage,
    MatInputModule,
    NgForOf,
    NgIf,
    MatIcon,
    MatMiniFabButton,
    PokemonListItemComponent
  ],
  template: `
<div class="container mx-auto p-4">
  <div class="flex justify-center space-x-4">
    <mat-form-field class="w-96">
      <mat-label>Entrez un nom de pokemon</mat-label>
      <input matInput type="text" [(ngModel)]="text">
    </mat-form-field>

    <button mat-mini-fab (click)="onSearchChange()">
      <mat-icon>search</mat-icon>
    </button>
  </div>

  <div class="flex justify-center my-4">
    <div class="relative h-32 w-full -mx-4">
      <img src="pokemon_list_img.jpg" alt="Pokemon List" class="h-full w-full object-cover rounded-lg">
      <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <span class="text-white text-4xl font-semibold">LISTE DES POKEMONS</span>
      </div>
    </div>
  </div>

  <div class="flex justify-between items-center mb-4">
    <mat-slide-toggle [(ngModel)]="isFormsDisplayed" (ngModelChange)="onToggleChange($event)">
      Formes alternatives
    </mat-slide-toggle>
    <mat-paginator
      [length]="pokemonListData?.length"
      [pageSize]="pageSize"
      [pageIndex]="currentPage - 1"
      (page)="onPageChange($event)"
    />
  </div>

  <div class="text-center text-xl font-semibold py-4" *ngIf="pokemonListData && !currentPokemonListDisplayed?.length">
    <span>Aucun Pokémon trouvé</span>
  </div>

  <div *ngIf="!AllPokemonListData" class="flex justify-center py-4">
    <mat-spinner [diameter]="50"></mat-spinner>
  </div>

  <div *ngIf="AllPokemonListData" class="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
    <app-pokemon-list-item *ngFor="let pkmn of currentPokemonListDisplayed" [pokemonData]="pkmn" />
  </div>
</div>
`,
  styleUrls: ['./pokemon-list-page.component.css']
})
export class PokemonListPageComponent implements OnInit {
  text: string = '';
  isFormsDisplayed: boolean = false;
  currentPage: number = 1;
  pageSize: number = 50;
  AllPokemonListData: PokemonData[] | null = null;
  pokemonListData: PokemonData[] | null = null;
  currentPokemonListDisplayed: PokemonData[] | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPokemonList(this.text).subscribe((data: any) => {
      this.AllPokemonListData = data.pokemons;
      if (this.AllPokemonListData) {
        this.pokemonListData = this.AllPokemonListData.filter((pokemon: any) => this.isFormsDisplayed ? pokemon : pokemon.id <= 1025)
      }
      if (this.pokemonListData) {
        this.currentPokemonListDisplayed = this.pokemonListData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    });
  }

  fetchPokemonList(text: string): Observable<any> {
    return this.http.get(`https://api-dex-nine.vercel.app/pokemon?name=${text}&lang=fr&page=1&pageSize=1281&withForms=true`)
  }

  onSearchChange() {
    this.currentPage = 1;
    if (this.text === '') {
      if (this.AllPokemonListData) {
        this.pokemonListData = this.AllPokemonListData.filter((pokemon: any) => this.isFormsDisplayed ? pokemon : pokemon.id <= 1025)
      }
    } else {
      if (this.AllPokemonListData) {
        this.pokemonListData = this.AllPokemonListData.filter((pokemon: any) => this.isFormsDisplayed ? pokemon : pokemon.id <= 1025)
          .filter((pokemon: any) => pokemon.name.toLowerCase().includes(this.text.toLowerCase()))
      }
    }
    if (this.pokemonListData) {
      this.currentPokemonListDisplayed = this.pokemonListData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    if (this.pokemonListData) {
      this.currentPokemonListDisplayed = this.pokemonListData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  }

  onToggleChange(event: MatSlideToggleChange) {
    this.text = ''
    this.currentPage = 1;
    if (this.AllPokemonListData) {
      this.pokemonListData = this.AllPokemonListData.filter((pokemon: any) => this.isFormsDisplayed ? pokemon : pokemon.id <= 1025)
    }
    if (this.pokemonListData) {
      this.currentPokemonListDisplayed = this.pokemonListData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  }
}
