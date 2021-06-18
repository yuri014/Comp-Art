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

export interface SavedButtonProps {
  initialSaveState: boolean;
  postID: string;
}
export interface PostInteractionButtonsProps
  extends LikeButtonProps,
    IUpdateLevel {
  postProps: {
    _id: string;
    isSaved: boolean;
    isLiked: boolean;
    isShare: boolean;
  };
}
