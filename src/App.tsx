import {miniApp, sendData, useLaunchParams, useSignal} from '@tma.js/sdk-react';
import {AppRoot, Input, List, Placeholder} from '@telegram-apps/telegram-ui';
import {MainButton} from "@/components/MainButton.ts";
import {Icon12Search} from "@/icons/12/search.tsx";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  let query: string = '';
  let minPrice: number = 0;
  let maxPrice: number = 0;

  const handleSetMinPrice = (e: any) => {
    const value = e.target.value;
    minPrice = value.replace(/\D/g, "");
  };

  const handleSetMaxPrice = (e: any) => {
    const value = e.target.value;
    maxPrice = value.replace(/\D/g, "");
  };

  const handleClick = () => {
    const data: string = JSON.stringify({
      query: query,
      minPrice: minPrice,
      maxPrice: maxPrice
    })
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
          value={query}
          onChange={e => query = e.target.value}
          placeholder="Search query"
        />
        <Input
          value={minPrice}
          onChange={e => handleSetMinPrice(e)}
          placeholder="Min price"
          inputMode="numeric"
        />
        <Input
          value={maxPrice}
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
