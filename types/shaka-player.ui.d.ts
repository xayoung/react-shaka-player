declare module 'shaka-player/dist/shaka-player.ui' {
  export namespace extern {
    interface PlayerConfiguration {
      // ... properties based on shaka-player's documentation ...
    }
  }

  export namespace ui {
    class Overlay {
      constructor(
        player: Player,
        container: HTMLElement,
        video: HTMLVideoElement
      );
      destroy(): void;
      // ... other methods and properties based on shaka-player's documentation ...
    }
  }

  export class Player {
    constructor(video: HTMLVideoElement);
    configure(config: extern.PlayerConfiguration): void;
    load(manifestUri: string): Promise<void>;
    destroy(): Promise<void>;
    // ... other methods and properties based on shaka-player's documentation ...
  }

  // ... other exports from shaka-player ...
}
