import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {MainComponent} from './layout/main/main.component';

const routes: Routes = [
  {path: 'admin', children: [
      {path: 'login', component: LoginComponent},
      {path: '', component: MainComponent, children: [
          {path: 'home', component: HomeComponent}
        ]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
