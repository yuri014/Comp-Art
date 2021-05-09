import { useRouter } from 'next/router';

type UsePostAsLink = (
  postID: string,
) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

const usePostAsLink: UsePostAsLink = postID => {
  const router = useRouter();

  const handlePostRedirect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const targetEvent = e.target as HTMLElement;

    if (targetEvent.className !== 'not-post-redirect') {
      // TODO: `/post/${postID}`
      // É usado apenas o id porque a página está atualmente quebrada.
      // Aguarde o layout e a implementação da página.

      router.push(`/${postID}`);
    }
  };

  return handlePostRedirect;
};

export default usePostAsLink;
