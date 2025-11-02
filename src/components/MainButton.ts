import {useEffect} from 'react';
import {mainButton} from '@tma.js/sdk-react';

export function MainButton({text, onClick, disabled}: { text: string, onClick: () => void, disabled: boolean }) {

  useEffect(() => {
    mainButton.show();
    mainButton.setText(text)
    return () => {
      mainButton.hide();
    };
  }, [text]);

  useEffect(() => {
    if (disabled)
      mainButton.disable()
    else
      mainButton.enable()
  }, [disabled])

  useEffect(() => {
    mainButton.onClick(onClick);
    return () => {
      mainButton.offClick(onClick);
    }
  }, [onClick]);

  return null;
}