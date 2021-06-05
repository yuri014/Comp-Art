export interface LikeButtonProps {
  dislikePost: () => void;
  likePost: () => void;
}

interface IUpdateLevel {
  updateLevel?: () => void;
}

export interface ShareButtonProps extends IUpdateLevel {
  postID: string;
}

export interface SavedButtonProps extends ShareButtonProps {
  initialSaveState: boolean;
}
export interface PostInteractionButtonsProps
  extends LikeButtonProps,
    IUpdateLevel {
  postProps: { _id: string; isSaved: boolean; isLiked: boolean };
}
