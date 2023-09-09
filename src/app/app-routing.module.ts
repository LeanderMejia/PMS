import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { PlantedTreesComponent } from './components/planted-trees-page/planted-trees.component';
import { BambooComponent } from './components/bamboo-page/bamboo.component';
import { WoodCharcoalComponent } from './components/wood-charcoal-page/wood-charcoal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent, canActivate: [LoginGuardService] },
    { path: 'planted-trees', component: PlantedTreesComponent, canActivate: [AuthGuardService] },
    { path: 'bamboo', component: BambooComponent, canActivate: [AuthGuardService] },
    { path: 'wood-charcoal', component: WoodCharcoalComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
