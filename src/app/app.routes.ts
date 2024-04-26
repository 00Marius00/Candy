import { Routes } from '@angular/router';
import { ClasamentComponent } from './clasament/clasament.component';
import { GameComponent } from './game/game.component';


export const routes: Routes = [
    { path: 'clasament', component: ClasamentComponent },
    { path: '', component: GameComponent}
];
