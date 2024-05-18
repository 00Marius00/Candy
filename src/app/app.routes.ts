import { Routes } from '@angular/router';
import { ClasamentComponent } from './clasament/clasament.component';
import { GameComponent } from './game/game.component';
import { CdkDragDropHorizontalSortingExample } from './drag/drag.component';


export const routes: Routes = [
    { path: 'clasament', component: ClasamentComponent },
    { path: '', component: GameComponent},
    { path: 'drag', component: CdkDragDropHorizontalSortingExample}
];
