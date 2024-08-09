import { createAction, props } from '@ngrx/store';

export const loadRepositories = createAction(
  '[Github] Load Repositories',
  props<{ username: string }>()
);

export const loadRepositoriesSuccess = createAction(
  '[Github] Load Repositories Success',
  props<{ repositories: any[] }>()
);

export const loadRepositoriesFailure = createAction(
  '[Github] Load Repositories Failure',
  props<{ error: string }>()
);

export const filterRepositories = createAction(
  '[Github] Filter Repositories',
  props<{ filter: string }>()
);