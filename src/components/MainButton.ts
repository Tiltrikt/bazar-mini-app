import {useEffect} from 'react';
import {mainButton} from '@tma.js/sdk-react';

export function MainButton({text, onClick, query, minPrice, maxPrice}: { text: string, onClick: () => void, query: string, minPrice: string, maxPrice: string }) {

  useEffect(() => {
    mainButton.show();
    mainButton.setText(text)
    return () => {
      mainButton.hide();
    };
  }, [text]);


  useEffect(() => {
    mainButton.onClick(onClick);
  }, [onClick, query, minPrice, maxPrice]);

  return null;
}