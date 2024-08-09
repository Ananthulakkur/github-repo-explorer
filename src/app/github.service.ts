import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly GITHUB_API_URL = 'https://api.github.com/graphql'; 

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const http = this.httpLink.create({ uri: this.GITHUB_API_URL });
    apollo.createDefault({
      link: http,
      cache: new InMemoryCache(),
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
    });
  }

  getRepositories(username: string) {
    const query = gql`
      query {
        user(login: "${username}") {
          repositories(first: 100, orderBy: { field: STARGAZERS, direction: DESC }) {
            nodes {
              name
              description
              stargazerCount
              url
            }
          }
        }
      }
    `;

    return this.apollo.query({ query }).pipe(
      // Map the response to the expected format
      map(data => {
        const repositories = data.data.user.repositories.nodes; 
        return repositories;
      }),
      catchError(error => {
        throw error; 
      })
    );
  }
}