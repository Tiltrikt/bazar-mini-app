import {useRef} from 'react';
import {useLaunchParams, useSignal, miniApp, sendData} from '@tma.js/sdk-react';
import {AppRoot, Input, List, Placeholder} from '@telegram-apps/telegram-ui';
import {MainButton} from "@/components/MainButton.ts";
import {Icon12Search} from "@/icons/12/search.tsx";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const queryRef = useRef("ou");
  const minPriceRef = useRef("blyat");
  const maxPriceRef = useRef("");

  const setQuery = (e: any) => (queryRef.current = e.target.value);
  const handleSetMinPrice = (e: any) => (minPriceRef.current = e.target.value.replace(/\D/g, ""));
  const handleSetMaxPrice = (e: any) => (maxPriceRef.current = e.target.value.replace(/\D/g, ""));

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
          before={<Icon12Search/>}
          value={queryRef.current}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search query"
        />
        <Input
          value={maxPriceRef.current}
          onChange={e => handleSetMinPrice(e)}
          placeholder="Min price"
          inputMode="numeric"
        />
        <Input
          value={maxPriceRef.current}
          onChange={e => handleSetMaxPrice(e)}
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
