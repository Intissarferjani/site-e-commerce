import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdminlayautComponent } from './admin/adminlayaut/adminlayaut.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { ProductComponent } from './admin/product/product.component';
import { PromotionComponent } from './admin/promotion/promotion.component';
import { ProductDetailsComponent } from './admin/product-details/product-details.component';
import { UserLayoutComponent } from './client/user-layout/user-layout.component';
import { UserproductComponent } from './client/userproduct/userproduct.component';

import { ContactComponent } from './client/contact/contact.component';
import { CartComponent } from './client/cart/cart.component';
import { ProfilComponent } from './profil/profil.component';
import { SearchComponent } from './admin/search/search.component';
import { CommandComponent } from './admin/command/command.component';
import { HomeComponent } from './client/home/home.component';
import { ChekoutComponent } from './client/chekout/chekout.component';





const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'rest',component:ResetpasswordComponent},
  {path:'profile',component:ProfilComponent},

  {path:'admin',component:AdminlayautComponent,
  children:[
    {path:'addproduct',component:AddproductComponent},
    {path:'product',component:ProductComponent},
    {path:'edit/:id',component:ProductDetailsComponent},
    {path:'promotion',component:PromotionComponent},
 
    {path:'search',component:SearchComponent},
    {path:'commande',component:CommandComponent},
 


  ]
},


{path:'',component:UserLayoutComponent,
  children:[
    {path:'userpro',component:UserproductComponent},
    {path:'',component:HomeComponent},
    {path:'contact',component:ContactComponent},
    {path:'cart',component:CartComponent},
    {path:'chek',component:ChekoutComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
