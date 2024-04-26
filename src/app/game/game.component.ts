import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  game: IGame;
  board: IBoard[] = [];
  constructor(){
    const rowsNumber: number = 10;
    const columnsNumber: number = 12;
    this.game = {
      score: 0,
      player: 'Marius',
      board: {
        rows: rowsNumber, 
        columns: columnsNumber, 
        candies: this.create_candies(rowsNumber, columnsNumber),
        table: this.create_table(rowsNumber, columnsNumber)
      },
      moves: 10
    }
  }
  counter(n: number): number[] {
    return Array(n).fill(0).map((x, i) => i);
  }
  create_table(rows: number, columns: number): number[][] {
    let table: number[][] = [];
    for (let i = 0; i < rows; i++) {
      let row: number[] = [];
      for (let j = 0; j < columns; j++) {
        row.push(0);
      }
      table.push(row);
    }
    return table;
  }
  create_candies(rows: number, columns: number): ICandy[] {
    let candies: ICandy[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const randomTypeIndex = Math.floor(Math.random() * Object.keys(CandyType).length);
        const randomType = Object.values(CandyType)[randomTypeIndex];
        candies.push({
          type: randomType,
          row: i,
          column: j,
          score: 10
        });
      }
    }
    return candies;
  }
}


export interface IGame {
  score: number;
  player: string;
  board: IBoard;
  moves: number;
}

export interface IBoard {
  rows: number;
  columns: number;
  candies: ICandy[];
  table: number[][];
}

export enum CandyType {
  red = 'red',
  blue = "blue",
  yellow = "yellow",
  green = "green", 
  purple = "purple",
}

export const BoardTypes = {
  level1: [[0,1,1,1,0], [0,2,2,2,0], [0,3,3,3,0], [0,0,0,0,0]],
  level2: [[0,1,1,1,0], [0,2,2,2,0], [0,3,3,3,0], [0,0,0,0,0]],
};

export interface ICandy {
  type: CandyType;
  row: number;
  column: number;
  score?: number;
}