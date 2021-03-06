import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import {environment} from '../environments/environment.prod';
import {getToken, isValidToken} from './utils/auth';

const uri = environment.graphQLUrl;
export function provideApollo(httpLink: HttpLink): any {
  const basic = setContext((operation, context) => ({
    headers: { Accept: 'charset=utf-8' }
  }));
  const auth = setContext((operation, context) => {
      const token = isValidToken() ? {Authorization: `Bearer ${getToken()}`} : {}
      return {
        headers: {...token}
      }
    }
  );
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return { link, cache }
}

@NgModule({
  exports: [
    HttpClientModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: provideApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {}
