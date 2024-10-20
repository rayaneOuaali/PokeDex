import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatNavList } from "@angular/material/list";
import { PokemonListPageComponent } from "./pokemon-list-page/pokemon-list-page.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatNavList,
    MatListItem,
    PokemonListPageComponent
  ],
  template: `
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #sidenav [mode]="sidenavMode" class="sidenav" [(opened)]="opened">
    <mat-nav-list>
      <a mat-list-item href="">Liste des Pokemons</a>
      <a mat-list-item href="/moves">Liste des attaques</a>
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content class="sidenav-content">
    <mat-toolbar color="primary" class="toolbar h-20">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>{{ title }}</span>
    </mat-toolbar>

    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
  `,
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'PokeDex';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  sidenavMode: 'over' | 'side' = 'side';
  opened = true;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]) // Observe si la résolution correspond à celle d'un téléphone (600px)
      .pipe(
        map(result => result.matches)
      )
      .subscribe(isHandset => {
        if (isHandset) {
          this.sidenavMode = 'over';
          this.opened = false;
        } else {
          this.sidenavMode = 'side';
          this.opened = true;
        }
      });
  }
}
