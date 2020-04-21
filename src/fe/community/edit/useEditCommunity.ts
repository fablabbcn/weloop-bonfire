import Maybe from 'graphql/tsutils/Maybe';
import { Community, CommunityUpdateInput } from 'graphql/types.generated';
import { useCallback, useMemo } from 'react';
import {
  useEditCommunityDataQuery,
  useEditCommunityMutation
} from './useEditCommunity.generated';
import { getMaybeUploadInput } from 'fe/mutation/upload/getUploadInput';

export interface UpdateCommunity {
  community: CommunityUpdateInput;
  icon: Maybe<File | string>;
}
export const useEditCommunity = (communityId: Community['id']) => {
  const [editMut, editMutStatus] = useEditCommunityMutation();
  const communityEditQ = useEditCommunityDataQuery({
    variables: { communityId }
  });

  const edit = useCallback(
    async ({ community, icon }: UpdateCommunity) => {
      if (editMutStatus.loading) {
        return;
      }
      return editMut({
        variables: {
          communityId,
          icon: getMaybeUploadInput(icon),
          community: {
            name: community.name,
            summary: community.summary
          }
        }
      });
    },
    [communityId, editMutStatus, editMut]
  );

  return useMemo(() => {
    const community = communityEditQ.data?.community;
    return {
      edit,
      community
    };
  }, [edit, communityEditQ]);
};
