import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


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
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  
  constructor(){
    this.levelArray = Boards.level3;
    const dimensions = this.getDimensions(this.levelArray);
    this.game = {
      score: 2389,
      place:10,
      player: 'Marius',
      board: {
        rows: dimensions.rows, 
        columns: dimensions.columns, 
        candies: this.create_candies(this.levelArray),
      },
      level: 2,
      moves: 10,
      
    }
  }

  counter(n: number): number[] {
    return Array(n).fill(0).map((x, i) => i);
  }

  create_candies(selectedLevel: number[][]): ICandy[] {
    let candies: ICandy[] = [];
    const dimensions = this.getDimensions(this.levelArray);
    
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.columns; j++) {
        if (selectedLevel[i][j] == 1){
          const randomTypeIndex = Math.floor(Math.random() * Object.keys(CandyType).length);
          const randomType = Object.values(CandyType)[randomTypeIndex];
          // table.push(randomType);
          candies.push({
            type: randomType,
            row: i,
            column: j,
            score: 10,
            isSelected: false
          });
        }
      }
    }
    // console.log(table);
    return candies;
  }

  getDimensions(matrix: number[][]): { rows: number, columns: number } {
    const rows = matrix.length;
    const columns = matrix[0].length;
    return { rows, columns };
  }
  getCandiesAtPosition(row: number, column: number): ICandy[] {
    return this.game.board.candies.filter(candy => candy.row === row && candy.column === column);
  }
  toggleImageClass(candy: ICandy): void {
    candy.isSelected= !candy.isSelected;
  }
  drop(event: CdkDragDrop<string[]>) {
    // this.game.board.candies[0].row = param1;
    // this.game.board.candies[0].column = param2;
    
    const currentRow = Number(event.item.element.nativeElement.attributes[9].value)
    const currentColumn = Number(event.item.element.nativeElement.attributes[10].value)
    const maxRow = this.game.board.rows
    const maxColumn = this.game.board.columns
    // Stanga
    if(event.distance.x < -25 && event.distance.y > -25 && event.distance.y < 25){
      this.game.board.candies.forEach(candy => {
        if(candy.row == currentRow && candy.column == currentColumn - 1){
          candy.column = currentColumn
          return
        }
        if(candy.row == currentRow && candy.column == currentColumn && candy.column > 0){
          candy.column = currentColumn - 1
          return
        }
      });
    }
    // Sus
    if(event.distance.y < -25 && event.distance.x > -25 && event.distance.x < 25){
      this.game.board.candies.forEach(candy => {
        if(candy.row == currentRow - 1 && candy.column == currentColumn){
          candy.row = currentRow
          return
        }
        if(candy.row == currentRow && candy.column == currentColumn && candy.row > 0){
          candy.row = currentRow - 1
          return
        }
      });
    }
    // Dreapta
    if(event.distance.x > 25 && event.distance.y > -25 && event.distance.y < 25){
      this.game.board.candies.forEach(candy => {
        if(candy.row == currentRow && candy.column == currentColumn + 1){
          candy.column = currentColumn
          return
        }
        if(candy.row == currentRow && candy.column == currentColumn && candy.column < maxColumn - 1){
          candy.column = currentColumn + 1
          return
        }
      });
    }
    // Jos
    if(event.distance.y > 25 && event.distance.x > -25 && event.distance.x < 25){
      this.game.board.candies.forEach(candy => {
        if(candy.row == currentRow + 1 && candy.column == currentColumn){
          candy.row = currentRow
          return
        }
        if(candy.row == currentRow && candy.column == currentColumn && candy.row < maxRow - 1){
          candy.row = currentRow + 1
          return
        }
      });
    }
    console.log(maxRow, maxColumn)
    
    // moveItemInArray(this.game.board.candies, event.previousIndex, event.currentIndex);
  }

  ngAfterViewInit() {
    // const cellElement = document.getElementById('cell-00'); // Selectează elementul celulei
    // const rowIndex = cellElement.parentElement.rowIndex; // Obține indexul rândului
    // const cellIndex = cellElement.cellIndex; // Obține indexul celulei în rând
    
    // console.log("Poziția în matrice:", { row: rowIndex, column: cellIndex });
  }
  getConnectedDropLists(rowIndex: number): string[] {
    const connectedDropLists = [];
    if (rowIndex == 0) connectedDropLists.push(`${rowIndex + 1}List`);

    if (rowIndex > 1 && rowIndex < this.game.board.rows){
      connectedDropLists.push(`${rowIndex - 1}List`);
      connectedDropLists.push(`${rowIndex + 1}List`);
    }
    if (rowIndex == this.game.board.rows - 1) connectedDropLists.push(`${rowIndex - 1}List`);
    return connectedDropLists;
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
  red = "red",
  blue = "blue",
  yellow = "yellow",
  green = "green", 
  purple = "purple", 
}

export const Boards = {
  level1: [
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1]
  ],
  level2: [
    [0,0,0,0,1,0,0,0,0], 
    [0,0,0,1,1,1,0,0,0], 
    [0,0,1,1,1,1,1,0,0], 
    [0,1,1,1,1,1,1,1,0], 
    [1,1,1,1,1,1,1,1,1], 
    [0,1,1,1,1,1,1,1,0], 
    [0,0,1,1,1,1,1,0,0], 
    [0,0,0,1,1,1,0,0,0], 
    [0,0,0,0,1,0,0,0,0]
  ],
  level3: [
    [1,1,1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1,1,1], 
    [0,1,1,1,1,1,1,1,0], 
    [0,0,1,1,1,1,1,0,0], 
    [0,0,1,1,1,1,1,0,0], 
    [0,0,1,1,1,1,1,0,0], 
    [0,1,1,1,1,1,1,1,0], 
    [1,1,1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1,1,1]
  ]

} 

export interface ICandy {
  type: CandyType;
  row: number;
  column: number;
  score?: number;
  isSelected: boolean;
}
