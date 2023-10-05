import muxjs from 'mux.js';
import React from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';

interface MyWindow extends Window {
  muxjs: string;
  player: any
}

(window as MyWindow & typeof globalThis).muxjs = muxjs;


// Define a type for the ref
interface ShakaPlayerRef {
  player: shaka.Player | null;
  ui: shaka.ui.Overlay | null;
  videoElement: HTMLVideoElement | null;
}

// Define a type for the props
type Props = React.HTMLProps<HTMLVideoElement> & {
  config?: shaka.extern.PlayerConfiguration;
  chromeless?: boolean;
  theme: 'default' | 'youtube'
};

/**
 * A React component for shaka-player.
 * @constructor
 */
const ShakaPlayer = React.forwardRef<ShakaPlayerRef, Props>(
  ({ src, config, chromeless, className, theme = 'default', ...rest }, ref) => {
    const uiContainerRef = React.useRef<HTMLDivElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const [player, setPlayer] = React.useState<shaka.Player | null>(null);
    const [ui, setUi] = React.useState<shaka.ui.Overlay | null>(null);

    // Effect to handle component mount & unmount.
    // Not related to the src prop, this hook creates a shaka.Player instance.
    // This should always be the first effect to run.
    React.useEffect(() => {
      if (videoRef.current) {
        const player = new shaka.Player(videoRef.current);
        setPlayer(player);

        let ui: shaka.ui.Overlay | null = null;
        if (!chromeless) {
          if (uiContainerRef.current) {
            ui = new shaka.ui.Overlay(
              player,
              uiContainerRef.current,
              videoRef.current
            );
            setUi(ui);
          }
        }

        return () => {
          player.destroy();
          if (ui) {
            ui.destroy();
          }
        };
      }
    }, []);

    // Keep shaka.Player.configure in sync.
    React.useEffect(() => {
      if (player && config) {
        player.configure(config);
      }
    }, [player, config]);

    // Load the source url when we have one.
    React.useEffect(() => {
      if (player && src) {
        initPlayer(player, src)
      }
    }, [player, src]);

    const initPlayer = async (player: shaka.Player, src: string) => {
      try {
        await player.load(src);
      } catch (error) {
        console.log(error)
      }
    }

    // Define a handle for easily referencing Shaka's player & ui API's.
    React.useImperativeHandle(
      ref,
      () => ({
        get player() {
          return player;
        },
        get ui() {
          return ui;
        },
        get videoElement() {
          return videoRef.current;
        }
      }),
      [player, ui]
    );

    return (
      <div ref={uiContainerRef} className={`${className} ${theme}`}>
        <video
          ref={videoRef}
          style={{
            maxWidth: '100%',
            width: '100%'
          }}
          {...rest}
        />
      </div>
    );
  }
);

export default ShakaPlayer;
