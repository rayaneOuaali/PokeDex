import {Component, Input} from '@angular/core';
import {MoveData} from "../../types/pokemon/pokemon-type";
import {NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {PokemonDialogComponent} from "../pokemon-dialog-component/pokemon-dialog-component.component";

@Component({
  selector: 'app-moves-list-item',
  standalone: true,
  imports: [
    NgClass,
    MatButton
  ],
  template: `
    <div class="bg-white p-4 rounded-lg shadow-md text-center moves-list-item">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg font-bold">#{{ moveData.id }} {{ moveData.name }}</span>
        <span [ngClass]="'bg-' + moveData.type.id" class="px-3 py-1 rounded text-white uppercase">
          {{ moveData.type.name }}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="text-center">
          <span class="block text-sm font-semibold">Dégâts</span>
          <span class="text-lg font-bold">{{ moveData.damage ?? '-' }}</span>
        </div>
        <div class="text-center">
          <span class="block text-sm font-semibold">Précision</span>
          <span class="text-lg font-bold">{{ moveData.accuracy ? moveData.accuracy + '%' : '-' }}</span>
        </div>
        <div class="text-center">
          <span class="block text-sm font-semibold">PP</span>
          <span class="text-lg font-bold">{{ moveData.pp }}</span>
        </div>
      </div>

      <div class="text-gray-600 text-sm">
        <p>{{ moveData.description }}</p>
      </div>
      <button mat-raised-button color="primary" class="mt-4" (click)="openDialog()">Voir les Pokémon</button>
    </div>
  `,
})
export class MovesListItemComponent {
  @Input() moveData: MoveData;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(PokemonDialogComponent, {
      data: { moveId: this.moveData.id }
    });
  }
}
