import {useState, useCallback} from 'react';
import {useLaunchParams, useSignal, miniApp} from '@tma.js/sdk-react';
import {AppRoot, Input, List, Divider} from '@telegram-apps/telegram-ui';
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

  const handleClick = useCallback(() => {
    console.log(minPrice, minPrice, query);
  }, []);

  return (
  <AppRoot
    appearance={isDark ? 'dark' : 'light'}
    platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
  >
    <List>
      {/*<Section>*/}
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search query"
        />
        <Divider/>
        <Input
          value={minPrice}
          onChange={e => handleSetMinPrice(e)}
          placeholder="Min price"
          inputMode="numeric"
        />
        <Divider/>
        <Input
          value={maxPrice}
          onChange={e => handleSetMaxPrice(e)}
          placeholder="Max price"
          inputMode="numeric"
        />
      {/*</Section>*/}
    </List>

    <MainButton onClick={handleClick}/>
  </AppRoot>
)
  ;
}
