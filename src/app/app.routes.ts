import { Routes } from '@angular/router';
import { PokemonListPageComponent } from './pokemon-list-page/pokemon-list-page.component';
import { MovesListPageComponent } from './moves-list-page/moves-list-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pokemon-list', pathMatch: 'full' },
  { path: 'pokemon-list', component: PokemonListPageComponent },
  { path: 'moves', component: MovesListPageComponent }
];
