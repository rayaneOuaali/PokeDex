import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMiniFabButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MoveData, Pagination, PokemonData} from "../../types/pokemon/pokemon-type";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {GetMovesListService} from "../get-moves-list.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgForOf, NgIf} from "@angular/common";
import {PokemonListItemComponent} from "../pokemon-list-item/pokemon-list-item.component";
import {MovesListItemComponent} from "../moves-list-item/moves-list-item.component";
import {GetPokemonsListService} from "../get-pokemons-list.service";

@Component({
  selector: 'app-moves-list-page',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    ReactiveFormsModule,
    MatPaginator,
    MatProgressSpinner,
    NgForOf,
    NgIf,
    FormsModule,
    MovesListItemComponent
  ],
  template: `
<div class="container mx-auto p-4">
  <div class="flex justify-center space-x-4">
    <mat-form-field class="w-96">
      <mat-label>Entrez un nom d'attaque</mat-label>
      <input matInput type="text" [(ngModel)]="text">
    </mat-form-field>

    <button mat-mini-fab (click)="onSearchChange()" class="my-auto">
      <mat-icon>search</mat-icon>
    </button>
  </div>

  <div class="flex justify-center my-4">
    <div class="relative h-32 w-full -mx-4">
      <img src="moves_list_img.jpg" alt="Pokemon List" class="h-full w-full object-cover rounded-lg">
      <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <span class="text-white text-4xl font-semibold">LISTE DES ATTAQUES</span>
      </div>
    </div>
  </div>

  <div class="flex justify-end items-center mb-4">
    <mat-paginator
      [length]="movesListData?.pagination?.count"
      [pageSize]="pageSize"
      [pageIndex]="currentPage - 1"
      (page)="onPageChange($event)"
    />
  </div>

  <div class="text-center text-xl font-semibold py-4" *ngIf="movesListData && !movesListData?.moves?.length">
    <span>Aucun Pokémon trouvé</span>
  </div>

  <div *ngIf="!movesListData" class="flex justify-center py-4">
    <mat-spinner [diameter]="50"></mat-spinner>
  </div>

  <div *ngIf="movesListData" class="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
    <app-moves-list-item *ngFor="let move of movesListData?.moves" [moveData]="move" />
  </div>
</div>
  `,
  styleUrl: './moves-list-page.component.css'
})
export class MovesListPageComponent {
  text: string = '';
  currentPage: number = 1;
  pageSize: number = 50;
  movesListData: { moves: MoveData[], pagination: Pagination } | null = null;
  pokemonListByMoveId = null;

  constructor(
    private getMovesListService: GetMovesListService,
    private getPokemonsListSerivce: GetPokemonsListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.text = params['search'] || '';
      this.currentPage = params['page'] ? +params['page'] : 1;

      this.fetchRequest();
    });
  }

  fetchRequest(): void {
    this.getMovesListService
      .getMovesList(this.text, this.currentPage)
      .subscribe((data: any) => {
        this.movesListData = data;
      });
  }

  fetchPokemonsByMoveId(moveId: number) {
    this.getPokemonsListSerivce
      .getPokemonsByMoveId(moveId)
      .subscribe((data: any) => {
        this.pokemonListByMoveId = data;
      });
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      queryParams: {
        search: this.text || null,
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
}
