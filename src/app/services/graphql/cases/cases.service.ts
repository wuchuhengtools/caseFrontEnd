import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphqlService} from '../graphql.service';
import {gql} from '@apollo/client/core';
import Observable from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  constructor(
    private apollo: Apollo,
    private graphql: GraphqlService
  ) { }

  create(params: GrapqlType.CreateCaseParamsType): Observable<GrapqlType.CreateCaseResType>
  {
    const graphql = gql`
      mutation createCase(
        $id: Int!,
        $label: String!,
        $bannerFileIds: [Int!]!,
        $category: Int!,
        $coverFileId: Int!,
        $desc: String!,
        $detailFileId: Int!,
        $iconFileId: Int!,
        $remark: String!,
      ) {
        create(
          id: $id,
          label: $label,
          bannerFileIds: $bannerFileIds,
          category: $category,
          coverFileId: $coverFileId,
          desc: $desc,
          detailFileId: $detailFileId,
          iconFileId: $iconFileId,
          remark: $remark
        )
      }
    `
    return this.graphql.mutation<GrapqlType.CreateCaseResType>(graphql, params)
  }

  getCase(params: GrapqlType.CaseParamsType): Observable<{cases: GrapqlType.CaseResType}>
  {
    const graphql = gql`
      query getCases($page: Int!, $pageSize: Int!) {
        cases(page: $page, pageSize: $pageSize) {
          total
          items {
            id
            uid
            label
            version
            icon{id url}
            type
            file{id url}
            cover{id url}
            banner{id, url}
            detail {id url}
            desc
            remark
          }
        }
      }
    `
    return this.graphql.query<{cases: GrapqlType.CaseResType}>(graphql, params)
  }
}
