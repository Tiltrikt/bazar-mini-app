import {useEffect} from 'react';
import {mainButton} from '@tma.js/sdk-react';

export function MainButton({text, onClick}: { text: string, onClick: () => void }) {

  useEffect(() => {
    mainButton.show();
    mainButton.setText(text)
    return () => {
      mainButton.hide();
    };
  }, [text]);

  useEffect(() => {
    mainButton.onClick(onClick);
  }, [onClick]);

  return null;
}