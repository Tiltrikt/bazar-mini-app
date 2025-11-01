import { useEffect } from 'react';
import { mainButton, useSignal } from '@tma.js/sdk-react';

/**
 * Component which controls the Back Button visibility.
 */
export function MainButton() {
  const isVisible = useSignal(mainButton.isVisible);

  useEffect(() => {
    console.log('The button is', isVisible ? 'visible' : 'invisible');
  }, [isVisible]);

  useEffect(() => {
    mainButton.show();
    return () => {
      mainButton.hide();
    };
  }, []);

  return null;
}