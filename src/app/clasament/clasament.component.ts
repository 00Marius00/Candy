import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clasament',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clasament.component.html',
  styleUrl: './clasament.component.css',
})
export class ClasamentComponent {
  Clasament: IClasamentItem[]= [];
  
  constructor() {
    this.ClasamentComponent();
  }
  private ClasamentComponent() {
    this.Clasament = [
      { Nume: "Alex", Loc: 1, Scor: 100 },
      { Nume: "Maria", Loc: 2, Scor: 95 },
      { Nume: "Andrei", Loc: 3, Scor: 90 },
      { Nume: "Elena", Loc: 4, Scor: 85 },
      { Nume: "Ion", Loc: 5, Scor: 80 },
      { Nume: "Ana", Loc: 6, Scor: 75 },
      { Nume: "Vlad", Loc: 7, Scor: 70 },
      { Nume: "Diana", Loc: 8, Scor: 65 },
      { Nume: "George", Loc: 9, Scor: 60 },
      { Nume: "Ioana", Loc: 10, Scor: 55 },
      { Nume: "Mihai", Loc: 11, Scor: 50 },
      { Nume: "Laura", Loc: 12, Scor: 45 },
      { Nume: "Cristian", Loc: 13, Scor: 40 },
      { Nume: "Andreea", Loc: 14, Scor: 35 },
      { Nume: "Radu", Loc: 15, Scor: 30 },
      { Nume: "Raluca", Loc: 16, Scor: 25 },
      { Nume: "Gabriel", Loc: 17, Scor: 20 },
      { Nume: "Adriana", Loc: 18, Scor: 15 },
      { Nume: "Catalin", Loc: 19, Scor: 10 },
      { Nume: "Alina", Loc: 20, Scor: 5 },
      { Nume: "Marius", Loc: 21, Scor: 100 },
      { Nume: "Simona", Loc: 22, Scor: 95 },
      { Nume: "Florin", Loc: 23, Scor: 90 },
      { Nume: "Cristina", Loc: 24, Scor: 85 },
      { Nume: "Bogdan", Loc: 25, Scor: 80 },
      { Nume: "Denisa", Loc: 26, Scor: 75 },
      { Nume: "Dan", Loc: 27, Scor: 70 },
      { Nume: "Monica", Loc: 28, Scor: 65 },
      { Nume: "Robert", Loc: 29, Scor: 60 },
      { Nume: "Ana-Maria", Loc: 30, Scor: 55 },
      { Nume: "Iulia", Loc: 31, Scor: 50 },
      { Nume: "Costin", Loc: 32, Scor: 45 },
      { Nume: "Alexandra", Loc: 33, Scor: 40 },
      { Nume: "Valentin", Loc: 34, Scor: 35 },
      { Nume: "Teodora", Loc: 35, Scor: 30 },
      { Nume: "Victor", Loc: 36, Scor: 25 },
      { Nume: "Eduard", Loc: 37, Scor: 20 },
      { Nume: "Mihaela", Loc: 38, Scor: 15 },
      { Nume: "Alexandru", Loc: 39, Scor: 10 },
      { Nume: "Anda", Loc: 40, Scor: 5 },
      { Nume: "Sorin", Loc: 41, Scor: 100 },
      { Nume: "Diana", Loc: 42, Scor: 95 },
      { Nume: "Mara", Loc: 43, Scor: 90 },
      { Nume: "Iulian", Loc: 44, Scor: 85 },
      { Nume: "Ilinca", Loc: 45, Scor: 80 },
      { Nume: "Elena", Loc: 46, Scor: 75 },
      { Nume: "Doru", Loc: 47, Scor: 70 },
      { Nume: "Nicoleta", Loc: 48, Scor: 65 },
      { Nume: "Stefan", Loc: 49, Scor: 60 },
      { Nume: "Maria", Loc: 50, Scor: 55 }
    ];
  }
}

export interface IClasamentItem {
  Nume: string;
  Loc: number;
  Scor: number;
}



