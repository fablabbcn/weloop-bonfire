import * as Types from '../../../../graphql/types.generated';

import { CommunityInfoFragment } from '../community/CommunityPreview.generated';
import gql from 'graphql-tag';
import { CommunityInfoFragmentDoc } from '../community/CommunityPreview.generated';


export type CollectionPreviewFragment = (
  { __typename: 'Collection' }
  & Pick<Types.Collection, 'id' | 'icon' | 'isLocal' | 'canonicalUrl' | 'name' | 'summary' | 'resourceCount' | 'displayUsername'>
  & { myFlag: Types.Maybe<(
    { __typename: 'Flag' }
    & Pick<Types.Flag, 'id'>
  )>, myFollow: Types.Maybe<(
    { __typename: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, community: Types.Maybe<(
    { __typename: 'Community' }
    & Pick<Types.Community, 'id'>
    & CommunityInfoFragment
  )> }
);

export const CollectionPreviewFragmentDoc = gql`
    fragment CollectionPreview on Collection {
  id
  icon
  isLocal
  canonicalUrl
  name
  summary
  resourceCount
  displayUsername
  myFlag {
    id
  }
  myFollow {
    id
  }
  community {
    id
    ...CommunityInfo
  }
}
    ${CommunityInfoFragmentDoc}`;
