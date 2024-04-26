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
      {
        Nume:"Nr1", 
        Loc:1
      },
      {
        Nume:"Nr2", 
        Loc:2
      },
      {
        Nume:"Nr3", 
        Loc:3
      },
      {
        Nume:"Nr4", 
        Loc:4
      },
      {
        Nume:"Nr5", 
        Loc:5
      },
      {
        Nume:"Nr6", 
        Loc:6
      },
      {
        Nume:"Nr7", 
        Loc:7
      },
      {
        Nume:"Nr8", 
        Loc:8
      },
      {
        Nume:"Nr9", 
        Loc:9
      },
      {
        Nume:"Nr10", 
        Loc:10
      }
    ];
  }
}

export interface IClasamentItem {
  Nume: string;
  Loc: number;
}



