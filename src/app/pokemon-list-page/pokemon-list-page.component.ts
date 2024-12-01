import {Component, OnInit} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {PokemonListItemComponent} from "../pokemon-list-item/pokemon-list-item.component";
import {Pagination, PokemonData} from "../../types/pokemon/pokemon-type";
import {GetPokemonsListService} from "../get-pokemons-list.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-list-page',
  standalone: true,
  imports: [
    MatPaginator,
    MatProgressSpinner,
    MatSlideToggle,
    FormsModule,
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

    <button mat-mini-fab (click)="onSearchChange()" class="my-auto">
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
      [length]="pokemonListData?.pagination?.count"
      [pageSize]="pageSize"
      [pageIndex]="currentPage - 1"
      (page)="onPageChange($event)"
    />
  </div>

  <div class="text-center text-xl font-semibold py-4" *ngIf="pokemonListData && !pokemonListData?.pokemons?.length">
    <span>Aucun Pokémon trouvé</span>
  </div>

  <div *ngIf="!pokemonListData" class="flex justify-center py-4">
    <mat-spinner [diameter]="50"></mat-spinner>
  </div>

  <div *ngIf="pokemonListData" class="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
    <app-pokemon-list-item *ngFor="let pkmn of pokemonListData?.pokemons" [pokemonData]="pkmn" />
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
  pokemonListData: { pokemons: PokemonData[], pagination: Pagination } | null = null;
  constructor(
    private getPokemonsListService: GetPokemonsListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.text = params['search'] || '';
      this.isFormsDisplayed = params['forms'] === 'true';
      this.currentPage = params['page'] ? +params['page'] : 1;

      this.fetchRequest();
    });
  }

  fetchRequest(): void {
    this.getPokemonsListService
      .getPokemonsList(this.text, this.currentPage, this.isFormsDisplayed)
      .subscribe((data: any) => {
        this.pokemonListData = data;
      });
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      queryParams: {
        search: this.text || null,
        forms: this.isFormsDisplayed ? 'true' : null,
        page: this.currentPage !== 1 ? this.currentPage : null
      },
      queryParamsHandling: 'merge'
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.updateQueryParams();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.updateQueryParams();
  }

  onToggleChange(event: MatSlideToggleChange): void {
    this.text = '';
    this.currentPage = 1;
    this.updateQueryParams();
  }
}
