import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PlantedTreesComponent } from './components/planted-trees-page/planted-trees.component';
import { BambooComponent } from './components/bamboo-page/bamboo.component';
import { WoodCharcoalComponent } from './components/wood-charcoal-page/wood-charcoal.component';
import { FilterComponent } from './components/filter/filter.component';
import { PrintTableComponent } from './components/print-table/print-table.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        NavbarComponent,
        PlantedTreesComponent,
        BambooComponent,
        WoodCharcoalComponent,
        FilterComponent,
        PrintTableComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
    ],
    providers: [
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
