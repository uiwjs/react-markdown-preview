import copyTextToClipboard from '@uiw/copy-to-clipboard';
import { useEffect } from 'react';

function getParentElement(target: EventTarget | null): null | HTMLElement {
  if (!target) return null;
  const dom = target as HTMLElement;
  if (dom.dataset.code && dom.classList.contains('copied')) {
    return dom;
  }
  if (dom.parentElement) {
    return getParentElement(dom.parentElement);
  }
  return null;
}

export function useCopied(container: React.RefObject<HTMLDivElement>) {
  const handle = (event: Event) => {
    const target = getParentElement(event.target);
    if (!target) return;
    target.classList.add('active');
    copyTextToClipboard(target.dataset.code as string, function () {
      setTimeout(() => {
        target.classList.remove('active');
      }, 2000);
    });
  };
  useEffect(() => {
    container.current?.removeEventListener('click', handle, false);
    container.current?.addEventListener('click', handle, false);
    return () => {
      container.current?.removeEventListener('click', handle, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);
}
