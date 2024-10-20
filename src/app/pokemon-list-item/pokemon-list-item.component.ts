import {Component, Input, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {PokemonData} from "../../types/pokemon/pokemon-type";
import {style} from "@angular/animations";

@Component({
  selector: 'app-pokemon-list-item',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgStyle,
    MatIcon
  ],
  template: `
    <div class="bg-white p-4 rounded-lg shadow-md text-center pokemon-list-item">
      <div [ngStyle]="getBackgroundStyle()" class="w-full mb-4 p-4 rounded-lg border animated-background">
        <img [src]="pokemonData.imgUrl" alt="{{ pokemonData.name }}" class="mx-auto w-24 h-24 object-cover">
      </div>

      <div class="flex justify-between items-center space-x-2 mt-2">
        <span class="text-lg font-bold">#{{ pokemonData.pokemonId }} {{ pokemonData.name }}</span>
        <div class="flex space-x-2">
          <span *ngFor="let type of pokemonData.types" [ngClass]="'bg-' + type.id"
                class="px-2 py-1 text-white rounded uppercase">
            {{ type.name }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-6 gap-2 mt-4">
        <div *ngFor="let stat of stats" [ngStyle]="{'background-color': hslToHex(stat.value)}"
             class="rounded-lg p-2 text-center">
          <span class="block font-bold text-black">{{ stat.label }}</span>
          <span class="text-black">{{ stat.value }}</span>
        </div>
      </div>

      <div class="dropdown-wrapper" [ngClass]="{ 'open': isDropdownOpen }">
        <div class="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
          <p class="text-sm"><strong>Taille :</strong> {{ pokemonData.height }} m</p>
          <p class="text-sm"><strong>Poids :</strong> {{ pokemonData.weight }} kg</p>
          <p class="text-sm"><strong>Description :</strong> {{ pokemonData.description }}</p>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <button (click)="toggleDropdown()" class="focus:outline-none">
          <mat-icon>{{ isDropdownOpen ? 'expand_less' : 'expand_more' }}</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrl: './pokemon-list-item.component.css'
})
export class PokemonListItemComponent {
  @Input() pokemonData: PokemonData;

  stats: { label: string, value: number }[] = [];
  isDropdownOpen = false;
  dropdownHeight = '0px';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonData'] && this.pokemonData) {
      this.initializeStats();
    }
  }

  initializeStats(): void {
    this.stats = [
      {label: 'PV', value: this.pokemonData.hp},
      {label: 'ATTAQUE', value: this.pokemonData.atk},
      {label: 'DÉFENSE', value: this.pokemonData.def},
      {label: 'ATQ SPÉ', value: this.pokemonData.speAtk},
      {label: 'DEF SPÉ', value: this.pokemonData.speDef},
      {label: 'VITESSE', value: this.pokemonData.speed}
    ];
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getCssVariable(variableName: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }

  getBackgroundStyle(): { [key: string]: string } {
    const pokemonColor = this.pokemonData.color;
    const gradientColors = this.pokemonData.types.map((type: any) => this.getCssVariable(`--${type.id}`)).reverse();

    return {
      'background': `linear-gradient(-45deg, ${pokemonColor}, ${gradientColors.join(', ')})`,
      'background-size': '400% 400%',
    };
  }

  hslToHex(h: number): string {
    h = h > 200 ? 200 : h - 15;
    const a = (100 * Math.min(0.5, 0.5)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = 0.5 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  protected readonly style = style;
}
