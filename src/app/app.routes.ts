import { Routes } from '@angular/router';
import { ListPkmComponent } from './components/poke/list-pkm/list-pkm.component';
import { DetailsPkmComponent } from './components/poke/details-pkm/details-pkm.component';

export const routes: Routes = [
    { path: 'listPoke', component: ListPkmComponent },
    { path: 'details-pkm/:urlPoke', component: DetailsPkmComponent },
    { path: '**', redirectTo: 'listPoke' }
];
