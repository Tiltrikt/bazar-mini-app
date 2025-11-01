import { useLaunchParams, useSignal, miniApp, backButton } from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import {BackButton} from "@/components/BackButton.ts";


export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  backButton.mount();

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <BackButton>
      </BackButton>
    </AppRoot>
  );
}
