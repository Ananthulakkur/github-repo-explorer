import { createReducer, on } from '@ngrx/store';
import { loadRepositories, loadRepositoriesSuccess, loadRepositoriesFailure, filterRepositories } from './github.actions';

export interface GithubState {
  repositories: any[];
  error: string | null;
  loading: boolean;
  filter: string;
}

const initialState: GithubState = {
  repositories: [],
  error: null,
  loading: false,
  filter: ''
};

export const githubReducer = createReducer(
  initialState,
  on(loadRepositories, (state) => ({ ...state, loading: true })),
  on(loadRepositoriesSuccess, (state, { repositories }) => ({ ...state, repositories, loading: false })),
  on(loadRepositoriesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(filterRepositories, (state, { filter }) => ({ ...state, filter }))
);