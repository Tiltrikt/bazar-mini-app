import {useRef} from 'react';
import {useLaunchParams, useSignal, miniApp, sendData} from '@tma.js/sdk-react';
import {AppRoot, Input, List, Placeholder} from '@telegram-apps/telegram-ui';
import {MainButton} from "@/components/MainButton.ts";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const queryRef = useRef("ou");
  const minPriceRef = useRef("blyat");
  const maxPriceRef = useRef("");

  const handleClick = () => {
    const data = JSON.stringify({
      query: queryRef.current,
      minPrice: minPriceRef.current,
      maxPrice: maxPriceRef.current,
    });
    sendData.ifAvailable(data);
  };

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <Placeholder
        header="Bazar"
        description="Search agents for you"
      >
        <img
          alt="Telegram sticker"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Moon_rotating_full_220px.gif"
          style={{display: 'block', width: '144px', height: '144px'}}
        />
      </Placeholder>
      <List>
        <Input
          defaultValue={queryRef.current}
          onChange={e => (queryRef.current = e.target.value)}
          placeholder="Search query"
        />
        <Input
          defaultValue={minPriceRef.current}
          onChange={e => (minPriceRef.current = e.target.value.replace(/\D/g, ""))}
          placeholder="Min price"
          inputMode="numeric"
        />
        <Input
          defaultValue={maxPriceRef.current}
          onChange={e => (maxPriceRef.current = e.target.value.replace(/\D/g, ""))}
          placeholder="Max price"
          inputMode="numeric"
        />

      </List>

      <MainButton
        onClick={handleClick}
        text="Create new Agent"
      />
    </AppRoot>
  )
    ;
}
