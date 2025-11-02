import {
  setDebug,
  themeParams,
  initData,
  viewport,
  init as initSDK,
  mockTelegramEnv,
  type ThemeParams,
  retrieveLaunchParams,
  emitEvent,
  miniApp,
  backButton,
  mainButton,
} from '@tma.js/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(options: {
  debug: boolean;
  eruda: boolean;
  mockForMacOS: boolean;
}): Promise<void> {
  // Set @telegram-apps/sdk-react debug mode and initialize it.
  setDebug(options.debug);
  initSDK();

  // Add Eruda if needed.
  options.eruda && void import('eruda').then(({default: eruda}) => {
    eruda.init();
    eruda.position({x: window.innerWidth - 50, y: 0});
  });

  // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
  // even response to the "web_app_request_theme" method. It also generates an incorrect
  // event for the "web_app_request_safe_area" method.
  if (options.mockForMacOS) {
    let firstThemeSent = false;
    mockTelegramEnv({
      onEvent(event, next) {
        if (event.name === 'web_app_request_theme') {
          let tp: ThemeParams = {};
          if (firstThemeSent) {
            tp = themeParams.state();
          } else {
            firstThemeSent = true;
            tp ||= retrieveLaunchParams().tgWebAppThemeParams;
          }
          return emitEvent('theme_changed', {theme_params: tp});
        }

        if (event.name === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', {left: 0, top: 0, right: 0, bottom: 0});
        }

        next();
      },
    });
  }

  // Mount all components used in the project.
  backButton.mount.ifAvailable();
  mainButton.mount.ifAvailable();
  initData.restore();

  if (miniApp.mount.isAvailable()) {
    themeParams.mount();
    miniApp.mount();
    themeParams.bindCssVars();

    const tp = {
      accent_text_color: themeParams.state().accent_text_color,
      bg_color: themeParams.state().section_bg_color,
      button_color: themeParams.state().button_color,
      button_text_color: themeParams.state().button_text_color,
      destructive_text_color: themeParams.state().destructive_text_color,
      header_bg_color: themeParams.state().header_bg_color,
      hint_color: themeParams.state().hint_color,
      link_color: themeParams.state().link_color,
      secondary_bg_color: themeParams.state().secondary_bg_color,
      section_bg_color: themeParams.state().section_bg_color,
      section_header_text_color: themeParams.state().section_header_text_color,
      subtitle_text_color: themeParams.state().subtitle_text_color,
      text_color: themeParams.state().text_color,
    } as const;
    emitEvent('theme_changed', { theme_params: tp });
  }

  if (viewport.mount.isAvailable()) {
    viewport.mount().then(() => {
      viewport.bindCssVars();
    });
  }
}