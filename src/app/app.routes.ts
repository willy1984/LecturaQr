import { Routes } from '@angular/router';
import { ListPkmComponent } from './components/poke/list-pkm/list-pkm.component';
import { DetailsPkmComponent } from './components/poke/details-pkm/details-pkm.component';
import { HomeComponent } from './components/home/home.component';
import { ReadCodeComponent } from './components/read-code/read-code.component';
import { ClientDataComponent } from './components/client-data/client-data.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'read-code', component: ReadCodeComponent },
    { path: 'listPoke', component: ListPkmComponent },
    { path: 'details-pkm/:urlPoke', component: DetailsPkmComponent },
    { path: 'client-data', component: ClientDataComponent },
    { path: '**', redirectTo: 'home' }
];
