import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent {
  game: IGame;
  board: IBoard[] = [];
  levelArray: number [][];
  constructor(){
    this.levelArray = Boards.level2;
    const dimensions = this.getDimensions(this.levelArray);
    this.game = {
      score: 2389,
      place:10,
      player: 'Marius',
      board: {
        rows: dimensions.rows, 
        columns: dimensions.columns, 
        candies: this.create_candies(dimensions.rows, dimensions.columns, this.levelArray),
      },
      level: 2,
      moves: 10
    }
  }

  counter(n: number): number[] {
    return Array(n).fill(0).map((x, i) => i);
  }

  create_candies(rows: number, columns: number, selectedLevel: number[][]): ICandy[] {
    let candies: ICandy[] = [];
    // const selectedLevel = Boards.level1;
    console.log(this.getDimensions(selectedLevel));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (selectedLevel[i][j] == 1){
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
    }
    return candies;
  }

  getDimensions(matrix: number[][]): { rows: number, columns: number } {
    const rows = matrix.length;
    const columns = matrix[0].length;
    return { rows, columns };
  }
}


export interface IGame {
  score: number;
  player: string;
  place: number;
  board: IBoard;
  moves: number;
  level: number;
}

export interface IBoard {
  rows: number;
  columns: number;
  candies: ICandy[];
}

export enum CandyType {
  red = 'red',
  blue = "blue",
  yellow = "yellow",
  green = "green", 
  purple = "purple", 
}

export const Boards = {
  level1: [[1,1,1,1,1,1,1],[1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,1,1,1,1,1], [1,1,1,1,1,1,1]],
  level2: [[0,0,0,0,1,0,0,0,0], [0,0,0,1,1,1,0,0,0], [0,0,1,1,1,1,1,0,0], [0,1,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,1,0], [0,0,1,1,1,1,1,0,0], [0,0,0,1,1,1,0,0,0], [0,0,0,0,1,0,0,0,0]]

} 

export interface ICandy {
  type: CandyType;
  row: number;
  column: number;
  score?: number;
}
