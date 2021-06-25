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
    const openInAnotherTab = e.ctrlKey || e.button === 1;
    const targetEvent = e.target as HTMLElement;
    const excludeTags = ['button', 'a', 'svg', 'path', 'img', 'p', 'circle'];

    const checkContainClass = (classNames: string[]) =>
      classNames.map(className => targetEvent.classList.contains(className));

    const checkExcludeTags = excludeTags.includes(targetEvent.localName);
    const isAClickOut = targetEvent.getAttribute('aria-hidden') === 'true';
    const isASlider = targetEvent.getAttribute('role') === 'slider';
    const isAMenu = targetEvent.getAttribute('role') === 'menu';
    const isInRoot = document.querySelector('#__next').contains(targetEvent);
    const isRightButtonClick = e.button === 2;
    const checkClassName = checkContainClass([
      'prevent-redirect-post',
      'hashtag',
      'mention',
    ]).includes(true);

    const checks = [
      !checkClassName,
      !checkExcludeTags,
      !isAClickOut,
      !isASlider,
      !isAMenu,
      !isRightButtonClick,
      isInRoot,
    ];

    const canRedirect = checks.every(value => value === true);

    if (openInAnotherTab && canRedirect) {
      // Falso positivo abaixo
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      window.open(`${process.env.NEXT_PUBLIC_HOST}/post/${postID}`, '_blank');
    } else if (canRedirect) {
      router.push(`/post/${postID}`);
    }
  };

  return handlePostRedirect;
};

export default usePostAsLink;
