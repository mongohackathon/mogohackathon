import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialTableComponent } from './material-table/material-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { SearchtwoComponent } from './searchtwo/searchtwo.component';
import {MatIconModule} from '@angular/material/icon';
import { AddjobsComponent } from './addjobs/addjobs.component';
import { TimelineComponent } from './timeline/timeline.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TimelinetwoComponent } from './timelinetwo/timelinetwo.component';
import { JobnotificationComponent } from './jobnotification/jobnotification.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    MaterialTableComponent,
    SearchComponent,
    SearchtwoComponent,
    AddjobsComponent,
    TimelineComponent,
    TimelinetwoComponent,
    JobnotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
