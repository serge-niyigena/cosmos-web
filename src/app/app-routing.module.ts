import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'organizations',
    loadChildren: () => import('./features/organization/modules/organization.module').then(m => m.OrganizationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'item-types',
    loadChildren: () => import('./features/item-type/modules/item-type.module').then(m => m.ItemTypeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'item-categories',
    loadChildren: () => import('./features/item-category/module/item-category.module').then(m => m.ItemCategoryModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'project-categories',
    loadChildren: () => import('./features/project-category/module/project-category.module').then(m => m.ProjectCategoryModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'usage-status',
    loadChildren: () => import('./features/usage-status/module/usage-status.module').then(m => m.UsageStatusModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'unit-type',
    loadChildren: () => import('./features/unit-type/module/unit-type.module').then(m => m.UnitTypeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-type',
    loadChildren: () => import('./features/user-type/module/user-type.module').then(m => m.UserTypeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'project-status',
    loadChildren: () => import('./features/project-status/module/project-status.module').then(m => m.ProjectStatusModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'icons',
    loadChildren: () => import('./features/icons/icons.module').then(m => m.IconsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'typography',
    loadChildren: () => import('./features/typography/typography.module').then(m => m.TypographyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
