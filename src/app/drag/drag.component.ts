// import {Component} from '@angular/core';
// import {
//   CdkDragDrop,
//   moveItemInArray,
//   transferArrayItem,
//   CdkDrag,
//   CdkDropList,
// } from '@angular/cdk/drag-drop';

// /**
//  * @title Drag&Drop connected sorting
//  */
// @Component({
//   selector: 'cdk-drag-drop-connected-sorting-example',
//   templateUrl: './drag.component.html',
//   styleUrl: './drag.component.css',
//   standalone: true,
//   imports: [CdkDropList, CdkDrag],
// })
// export class CdkDragDropConnectedSortingExample {
//   todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

//   done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

//   drop(event: CdkDragDrop<string[]>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       transferArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex,
//       );
//     }
//   }
// }
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop horizontal sorting
 */
@Component({
  selector: 'cdk-drag-drop-horizontal-sorting-example',
  templateUrl: './drag.component.html',
  styleUrl: './drag.component.css',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule],
})
export class CdkDragDropHorizontalSortingExample {
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];
  candies = ['red','green','blue', 'yellow', 'purple'];

  drop(event: CdkDragDrop<string[]>) {
    if(!(event.currentIndex < event.previousIndex - 1) && !(event.currentIndex > event.previousIndex + 1))
      {
        // console.log(event.currentIndex, event.previousIndex);
        moveItemInArray(this.candies, event.previousIndex, event.currentIndex);
      }
    
  }
}