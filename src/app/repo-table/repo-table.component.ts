import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GithubService } from '../github.service';
import { loadRepositories } from '../store/github.actions';
import { selectRepositories } from '../store/github.selectors';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-repo-table',
  templateUrl: './repo-table.component.html',
  styleUrls: ['./repo-table.component.scss']
})
export class RepoTableComponent implements OnInit {
  gridOptions: GridOptions = {
    columnDefs: [
      { field: 'name', sortable: true, filter: true },
      { field: 'description', sortable: true, filter: true },
      { field: 'stargazerCount', sortable: true, filter: true },
      { field: 'url', sortable: true, filter: true, cellRenderer: 'linkRenderer' }
    ],
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    },
    rowData: [], // Initially empty
    rowSelection: 'single',
    suppressRowClickSelection: true,
    getRowStyle: params => {
      if (params.data.name === 'selectedRepo') {
        return { 'background-color': 'lightblue' };
      }
      return null;
    }
  };
  selectedRepo: any = null; 

  constructor(private store: Store, private githubService: GithubService) { }

  ngOnInit(): void {
    this.store.dispatch(loadRepositories({ username: 'your-github-username' })); 

    this.store.select(selectRepositories).subscribe(repositories => {
      this.gridOptions.rowData = repositories;
    });
  }

  onRowClick(event: any) {
    this.selectedRepo = event.data;
  }

  searchInput: string = '';

onInputChange(event: any) {
  this.searchInput = event.target.value; 
  this.store.dispatch(filterRepositories({ filter: this.searchInput }));
}
}