import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminlayautComponent } from './admin/adminlayaut/adminlayaut.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { ProductComponent } from './admin/product/product.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { PromotionComponent } from './admin/promotion/promotion.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProductDetailsComponent } from './admin/product-details/product-details.component';
import { UserLayoutComponent } from './client/user-layout/user-layout.component';
import { UserproductComponent } from './client/userproduct/userproduct.component';
import { ProfilComponent } from './profil/profil.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CategoryFilterPipe } from './category-filter.pipe';
import { SearchComponent } from './admin/search/search.component';
import { FilterPipe } from './filter.pipe';
import { SelectedProductService } from './selected-product.service';
import { ProductService } from './product.service';
import { CommandComponent } from './admin/command/command.component';
import { ChekoutComponent } from './client/chekout/chekout.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminlayautComponent,
    DashbordComponent,
    ProductComponent,
    AddproductComponent,
    PromotionComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    ProductDetailsComponent,
    UserLayoutComponent,
    UserproductComponent,
    ProfilComponent,
    CategoryFilterPipe,
    SearchComponent,
    FilterPipe,
    CommandComponent,
    ChekoutComponent 
  


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule,
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Utiliser la configuration Firebase de votre environnement
     provideFirestore(() => getFirestore())
    
  





  ],
  providers: [ ProductService, // Assurez-vous que ProductService est ajouté aux fournisseurs
  SelectedProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
