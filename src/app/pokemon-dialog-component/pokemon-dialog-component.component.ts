import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { GetPokemonsListService } from '../get-pokemons-list.service';
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pokemon-dialog',
  template: `
    <h2 mat-dialog-title class="text-center">Pokémon apprenant "{{ move }}"</h2>
    <mat-dialog-content>
      <ng-container *ngIf="categories.length; else noData">
        <div *ngFor="let category of categories" class="category">
          <h6 class="text-lg font-semibold mb-2">
            {{ category.name }}
          </h6>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div *ngFor="let pokemon of category.pokemons" class="flex flex-col items-center">
              <img [src]="pokemon.imgUrl" [alt]="pokemon.name" class="w-24 h-24 object-cover rounded shadow-md mb-2">
              <span class="text-sm font-medium">{{ pokemon.name }}</span>
              <span *ngIf="category.name === 'Appris par niveau'"
                    class="text-xs text-gray-500">Niveau: {{ pokemon.level }}</span>
            </div>
          </div>
        </div>
      </ng-container>
      <ng-template #noData>
        <p class="text-center text-gray-500">Aucun Pokémon trouvé</p>
      </ng-template>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fermer</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    NgIf,
    NgForOf
  ],
  standalone: true,
})
export class PokemonDialogComponent {
  categories: { name: string; pokemons: { name: string; imgUrl: string; level?: number }[] }[] = [];
  move: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { moveId: number },
    private getPokemonsListService: GetPokemonsListService
  ) {
    this.loadPokemons(data.moveId);
  }

  loadPokemons(moveId: number): void {
    this.getPokemonsListService.getPokemonsByMoveId(moveId).subscribe((response: any) => {
      this.move = response.move;

      this.categories = [
        { name: 'Appris par niveau', pokemons: response.level.map((p: any) => ({ ...p, level: p.level })) },
        { name: 'Appris par CT/CS', pokemons: response.hm },
        { name: 'Appris par œuf', pokemons: response.egg },
        { name: 'Appris par tuteur', pokemons: response.tutor },
      ].filter(category => category.pokemons.length > 0)
    });
  }
}
