import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GithubService } from '../github.service';
import { loadRepositories, loadRepositoriesSuccess, loadRepositoriesFailure } from './github.actions';

@Injectable()
export class GithubEffects {
  loadRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRepositories),
      mergeMap((action) =>
        this.githubService.getRepositories(action.username).pipe(
          map((repositories) => loadRepositoriesSuccess({ repositories })),
          catchError((error) => of(loadRepositoriesFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private githubService: GithubService) {}
}