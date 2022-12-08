import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MaterialTableComponent } from './material-table/material-table.component';
import { SearchtwoComponent } from './searchtwo/searchtwo.component';
import { AddjobsComponent } from './addjobs/addjobs.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelinetwoComponent } from './timelinetwo/timelinetwo.component';
import { JobnotificationComponent } from './jobnotification/jobnotification.component';

const routes: Routes = [
  {path:'',component:TimelinetwoComponent},
  // {path:'search',component:SearchComponent},
  // {path:'material-table',component:MaterialTableComponent},
  {path:'search',component:SearchtwoComponent},
  {path:'addjobs',component:AddjobsComponent},
  {path:'jobnotification',component:JobnotificationComponent},
  // {path:'timeline',component:TimelineComponent},
  // {path:'timelinetwo',component:TimelinetwoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
