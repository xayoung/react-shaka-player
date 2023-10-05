// shaka-react-video-player.d.ts
declare module 'shaka-react-video-player' {
  import { HTMLProps } from 'react';
  import shaka from 'shaka-player/dist/shaka-player.ui';

  interface ShakaPlayerRef {
    player: shaka.Player | null;
    ui: shaka.ui.Overlay | null;
    videoElement: HTMLVideoElement | null;
  }

  interface Props extends HTMLProps<HTMLVideoElement> {
    config?: shaka.extern.PlayerConfiguration;
    chromeless?: boolean;
    theme: 'default' | 'youtube';
  }

  const ShakaPlayer: React.ForwardRefExoticComponent<Props &
    React.RefAttributes<ShakaPlayerRef>>;

  export default ShakaPlayer;
}
