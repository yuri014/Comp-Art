import { useRouter } from 'next/router';

type UsePostAsLink = (
  postID: string,
) => (
  e:
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.KeyboardEvent<HTMLDivElement>,
) => void;

/**
 * Use para redirecionar o post.
 * Caso algum elemento dispara uma função ou é um link, aplique a classe 'prevent-redirect-post' para
 * não disparar essa função.
 * @param postID ID do post
 * @returns uma função para redirecionar para o post.
 */
const usePostAsLink: UsePostAsLink = postID => {
  const router = useRouter();

  const handlePostRedirect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const targetEvent = e.target as HTMLElement;

    if (targetEvent.className !== 'prevent-redirect-post') {
      // TODO: `/post/${postID}`
      // É usado apenas o id porque a página está atualmente quebrada.
      // Aguarde o layout e a implementação da página.

      router.push(`/${postID}`);
    }
  };

  return handlePostRedirect;
};

export default usePostAsLink;
