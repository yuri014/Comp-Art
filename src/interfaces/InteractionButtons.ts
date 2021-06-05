export interface LikeButtonProps {
  dislikePost: () => void;
  likePost: () => void;
}
export interface PostInteractionButtonsProps extends LikeButtonProps {
  postProps: { _id: string; isSaved: boolean; isLiked: boolean };
  updateLevel?: () => void;
}
