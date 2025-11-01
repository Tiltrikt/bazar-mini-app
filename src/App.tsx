import {useState} from 'react';
import {useLaunchParams, useSignal, miniApp, sendData} from '@tma.js/sdk-react';
import {AppRoot, Input, List} from '@telegram-apps/telegram-ui';
import {MainButton} from "@/components/MainButton.ts";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSetMinPrice = (e: any) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/\D/g, "");
    setMinPrice(onlyNumbers);
  };

  const handleSetMaxPrice = (e: any) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/\D/g, "");
    setMaxPrice(onlyNumbers);
  };

  const handleClick = () => {
    console.log(query)
    sendData(JSON.stringify(
      {
        query: query,
        minPrice: minPrice,
        maxPrice: maxPrice
      }
    ))
  };

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <List>
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
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
