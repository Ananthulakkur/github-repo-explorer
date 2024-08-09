import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoTableComponent } from './repo-table/repo-table.component';
import { RepoChartComponent } from './repo-chart/repo-chart.component';

const routes: Routes = [
  { path: '', component: RepoTableComponent },
  { path: 'chart', component: RepoChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }