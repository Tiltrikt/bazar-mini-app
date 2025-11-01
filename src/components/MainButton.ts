import { useEffect } from 'react';
import { mainButton } from '@tma.js/sdk-react';

/**
 * Component which controls the Back Button visibility.
 */
export function MainButton() {

  useEffect(() => {
    mainButton.show();
    mainButton.enable();
    return () => {
      mainButton.hide();
    };
  }, []);

  return null;
}