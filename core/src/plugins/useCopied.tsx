import copyTextToClipboard from '@uiw/copy-to-clipboard';
import { useCallback, useEffect } from 'react';

export function useCopied(container: React.RefObject<HTMLDivElement>) {
  const handle = useCallback((event: Event) => {
    const target = (event.currentTarget || event.target) as HTMLDivElement;
    target.classList.add('active');
    copyTextToClipboard(target.dataset.code as string, function () {
      setTimeout(() => {
        target.classList.remove('active');
      }, 2000);
    });
  }, []);
  useEffect(() => {
    const btns = container.current?.querySelectorAll('pre code + div.copied');
    btns && Array.from(btns).forEach((elm) => elm.addEventListener('click', handle, false));
    return () => {
      btns && Array.from(btns).forEach((elm) => elm.removeEventListener('click', handle, false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);
}
