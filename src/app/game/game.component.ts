import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag],
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
        const randomTypeIndex = Math.floor(Math.random() * Object.keys(CandyType).length);
        const randomType = Object.values(CandyType)[randomTypeIndex];
        
        if (selectedLevel[i][j] == 1){
          // table.push(randomType);
          candies.push({
            type: randomType,
            row: i,
            column: j,
            isEnable: true,
            score: 10
          });
        }else{
          candies.push({
            type: randomType,
            row: i,
            column: j,
            isEnable: false
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
    return this.game.board.candies.filter(candy => candy.row === row && candy.column === column && candy.isEnable);
  }

  getType(string: String): CandyType{
    switch (string){
      case 'red':
        return CandyType.red
      case 'yellow':
        return CandyType.yellow
      case 'green':
        return CandyType.green
      case 'purple':
        return CandyType.purple
      default:
        return CandyType.blue;
    }
  }

  getCandy(candyRow: number, candyColumn: number){
    return this.game.board.candies.find(function(candy: {
      type: CandyType
      row: number;
      column: number;
      isEnable: Boolean;
      score?: number;
    }): CandyType | undefined {
      if(candy.row == candyRow && candy.column == candyColumn){
        return candy.type
      }
      return 
    })
  }

  deleteCandy(candyRow: number, candyColumn: number){
    let candy = this.getCandy(candyRow, candyColumn)
    if(candy){
      candy.isEnable = false
    }
  }

  isValidMove(candy1: ICandy, candy2: ICandy): boolean {
    // Simulam mutarea
    [candy1.row, candy2.row] = [candy2.row, candy1.row];
    [candy1.column, candy2.column] = [candy2.column, candy1.column];
  
    const valid = this.hasMatch(candy1) || this.hasMatch(candy2);
  
    // Resetam mutarea
    [candy1.row, candy2.row] = [candy2.row, candy1.row];
    [candy1.column, candy2.column] = [candy2.column, candy1.column];
  
    return valid;
  }

  hasMatch(candy: ICandy): boolean {
    const { row, column, type } = candy;
  
    let horizontalMatch = 1;
    let verticalMatch = 1;
  
    // Verificam orizontal
    for (let i = column - 1; i >= 0; i--) {
      const checkCandy = this.getCandy(row, i);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      horizontalMatch++;
    }
    for (let i = column + 1; i < this.game.board.columns; i++) {
      const checkCandy = this.getCandy(row, i);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      horizontalMatch++;
    }
  
    // Verificam vertical
    for (let i = row - 1; i >= 0; i--) {
      const checkCandy = this.getCandy(i, column);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      verticalMatch++;
    }
    for (let i = row + 1; i < this.game.board.rows; i++) {
      const checkCandy = this.getCandy(i, column);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      verticalMatch++;
    }
  
    return horizontalMatch >= 3 || verticalMatch >= 3;
  }

  checkMove(candy1: ICandy, candy2: ICandy){
    if(this.isValidMove(candy1, candy2)){
      return true
    }
    return false
  }

  move2Candies(candy1Row: number, candy1Column: number, candy2Row: number, candy2Column: number ) {
    let candy1 = this.getCandy(candy1Row, candy1Column)
    let candy2 = this.getCandy(candy2Row, candy2Column)

    if(!candy2?.isEnable){
      return
    }

    if (candy1 && candy2) {
      if(this.checkMove(candy1, candy2)){
        [candy1.column, candy2.column, candy1.row, candy2.row] = [candy2.column, candy1.column, candy2.row, candy1.row];
        // this.deleteCandy(candy1.column, candy1.column)
      }
      return
    }
  }

  checkAndAddCandiesToDelete(candy: ICandy, candiesToDelete: Set<ICandy>) {
    const { row, column, type } = candy;
  
    // Verificare pe orizontală
    let horizontalMatch = [candy];
    for (let i = column - 1; i >= 0; i--) {
      const checkCandy = this.getCandy(row, i);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      horizontalMatch.push(checkCandy);
    }
    for (let i = column + 1; i < this.game.board.columns; i++) {
      const checkCandy = this.getCandy(row, i);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      horizontalMatch.push(checkCandy);
    }
    if (horizontalMatch.length >= 3) {
      horizontalMatch.forEach(c => candiesToDelete.add(c));
    }
  
    // Verificare pe verticală
    let verticalMatch = [candy];
    for (let i = row - 1; i >= 0; i--) {
      const checkCandy = this.getCandy(i, column);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      verticalMatch.push(checkCandy);
    }
    for (let i = row + 1; i < this.game.board.rows; i++) {
      const checkCandy = this.getCandy(i, column);
      if (!checkCandy || checkCandy.type !== type || !checkCandy.isEnable) break;
      verticalMatch.push(checkCandy);
    }
    if (verticalMatch.length >= 3) {
      verticalMatch.forEach(c => candiesToDelete.add(c));
    }
  }

  findCandiesToDelete(): Set<ICandy> {
    const candiesToDelete = new Set<ICandy>();
  
    // Verifică fiecare bomboană din matrice
    for (let row = 0; row < this.game.board.rows; row++) {
      for (let column = 0; column < this.game.board.columns; column++) {
        const candy = this.getCandy(row, column);
        if (candy && candy.isEnable) {
          this.checkAndAddCandiesToDelete(candy, candiesToDelete);
        }
      }
    }
  
    return candiesToDelete;
  }

  deleteCandies(candiesToDelete: Set<ICandy>) {
    candiesToDelete.forEach(candy => {
      candy.isEnable = false;
    });
    console.log('Candies to delete:', candiesToDelete);
  }
  
  // TO DO verificarea pe nivele
  drop(event: CdkDragDrop<string[]>) {    
    const currentRow = Number(event.item.element.nativeElement.attributes[9].value)
    const currentColumn = Number(event.item.element.nativeElement.attributes[10].value)
    // Stanga
    
    if(event.distance.x < -25 && event.distance.y > -25 && event.distance.y < 25){
      this.move2Candies(currentRow, currentColumn, currentRow, currentColumn - 1)
      const candiesToDelete = this.findCandiesToDelete();
      this.deleteCandies(candiesToDelete);
      
    }
    // Dreapta
    if(event.distance.x > 25 && event.distance.y > -25 && event.distance.y < 25){
      this.move2Candies(currentRow, currentColumn, currentRow, currentColumn + 1)
      const candiesToDelete = this.findCandiesToDelete();
      this.deleteCandies(candiesToDelete);
    }
    // Sus
    if(event.distance.y < -25 && event.distance.x > -25 && event.distance.x < 25){
      this.move2Candies(currentRow, currentColumn, currentRow - 1, currentColumn)
      const candiesToDelete = this.findCandiesToDelete();
      this.deleteCandies(candiesToDelete);
    }
    
    // Jos
    if(event.distance.y > 25 && event.distance.x > -25 && event.distance.x < 25){
      this.move2Candies(currentRow, currentColumn, currentRow + 1, currentColumn)
      const candiesToDelete = this.findCandiesToDelete();
      this.deleteCandies(candiesToDelete);
    }
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
  isEnable: Boolean;
  score?: number;
}
