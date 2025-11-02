import { useEffect, useRef } from "react";
import { mainButton } from "@tma.js/sdk-react";

export function MainButton({ text, onClick }: { text: string; onClick: () => void }) {
  const onClickRef = useRef(onClick);

  // обновляем ссылку при каждом изменении onClick
  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  // регистрируем обработчик один раз
  useEffect(() => {
    const handler = () => onClickRef.current();
    mainButton.onClick(handler);
    return () => {
      // Telegram API не имеет метода для снятия обработчика,
      // но если появится — стоит очистить здесь
    };
  }, []);

  // отображение и обновление текста кнопки
  useEffect(() => {
    mainButton.show();
    mainButton.setText(text);
    return () => mainButton.hide();
  }, [text]);

  return null;
}
