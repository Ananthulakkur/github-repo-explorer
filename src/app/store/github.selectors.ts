import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GithubState } from './github.reducer';

export const selectGithubState = createFeatureSelector<GithubState>('github');

export const selectRepositories = createSelector(
  selectGithubState,
  (state: GithubState) => {
    if (state.filter) {
      return state.repositories.filter(repo => 
        repo.name.toLowerCase().includes(state.filter.toLowerCase())
      );
    }
    return state.repositories;
  }
);

export const selectLoading = createSelector(
  selectGithubState,
  (state: GithubState) => state.loading
);

export const selectError = createSelector(
  selectGithubState,
  (state: GithubState) => state.error
);