import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tag',
    loadChildren: () => import('./modals/tag/tag.module').then( m => m.TagPageModule)
  },
  {
    path: 'analise',
    loadChildren: () => import('./modals/analise/analise.module').then( m => m.AnalisePageModule)
  },
  {
    path: 'face',
    loadChildren: () => import('./modals/face/face.module').then( m => m.FacePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
