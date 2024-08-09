import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { githubReducer } from './store/github.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RepoTableComponent } from './repo-table/repo-table.component';
import { RepoChartComponent } from './repo-chart/repo-chart.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { GithubService } from './github.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { GithubSignal } from './store/github.signal';
import { SignalStoreModule } from '@ngrx/signal';
// ... (other imports)

@NgModule({
  declarations: [
    AppComponent,
    RepoTableComponent,
    RepoChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot({ github: githubReducer }),
    EffectsModule.forRoot([]),
    HttpClientModule,
    ApolloModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    SignalStoreModule.forRoot(),
    // ... (other imports)
  ],
  providers: [
    GithubService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'https://api.github.com/graphql' }),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'ignore',
            },
            query: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'ignore',
            },
          },
        };
      },
      deps: [HttpLink]
    },
    GithubSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }