import {useEffect} from 'react';
import {mainButton} from '@tma.js/sdk-react';

export function MainButton({onClick}: { onClick: () => void }) {

  useEffect(() => {
    mainButton.show();
    return () => {
      mainButton.hide();
    };
  }, []);

  useEffect(() => {
    mainButton.show();
    mainButton.onClick(onClick);
  }, [onClick]);

  return null;
}