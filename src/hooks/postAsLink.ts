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
 * Use apenas em `onMouseDown` (Veja a doc).
 * Caso algum elemento dispara uma função ou é um link,
 * aplique a classe 'prevent-redirect-post' para não disparar essa função.
 * @param postID ID do post
 * @returns uma função para redirecionar para o post.
 */
const usePostAsLink: UsePostAsLink = postID => {
  const router = useRouter();

  const handlePostRedirect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const targetEvent = e.target as HTMLElement;
    const excludeTags = ['button', 'a', 'svg', 'path', 'img', 'p'];

    const checkContainClass = (className: string) =>
      targetEvent.classList.contains(className);

    const checkExcludeTags = excludeTags.includes(targetEvent.localName);
    const isAClickOut = targetEvent.getAttribute('aria-hidden') === 'true';
    const isASlider = targetEvent.getAttribute('role') === 'slider';
    const isAMenu = targetEvent.getAttribute('role') === 'menu';
    const checkClassName = checkContainClass('prevent-redirect-post');
    const excludeMuiButton = checkContainClass('MuiButtonBase-root');

    const checks = [
      !checkClassName,
      !checkExcludeTags,
      !isAClickOut,
      !isASlider,
      !excludeMuiButton,
      !isAMenu,
    ];

    const canRedirect = checks.every(value => value === true);

    if (canRedirect) {
      // TODO: `/post/${postID}`
      // É usado apenas o id porque a página está atualmente quebrada.
      // Aguarde o layout e a implementação da página.

      router.push(`/${postID}`);
    }
  };

  return handlePostRedirect;
};

export default usePostAsLink;
