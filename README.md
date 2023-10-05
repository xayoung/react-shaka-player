# React Shaka Player

A React component for [Shaka Player](https://github.com/google/shaka-player), an open-source JavaScript library for adaptive media. It is highly recommended to check the official shaka documentation first.

## Installation

`npm install shaka-react-video-player --save`

`yarn add shaka-react-video-player`

## Usage

As seen in the example below, the CSS bundled with `shaka-player` has been imported separately. This is because `shaka-react-video-player` does not require any CSS internally, which keeps you in full control of the styling as if you were not using this React wrapper.

```javascript
import React from 'react';
import ShakaPlayer from 'shaka-react-video-player';
import 'shaka-react-video-player/dist/controls.css';
import 'shaka-react-video-player/dist/themes.css';

function App() {
  return (
    <ShakaPlayer
      autoPlay
      src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
    />
  );
}
```

The following `ShakaPlayer` properties are supported all of video tags in the html:

| Property     | Description                                                                                 | Type    |
| ------------ | ------------------------------------------------------------------------------------------- | ------- |
| src          | The MPEG-DASH, or HLS media asset. Is provided to `shaka.Player.load` on mount or change.   | String  |
| autoPlay     | Whether the asset should autoplay or not, directly bound to the `HTMLVideoElement` element. | Boolean |
| width        | Width of the player.                                                                        | Number  |
| height       | Height of the player.                                                                       | Number  |
| playbackRate | Sets the speed of the audio/video playback.                                                 | Number  |
| muted        | Sets whether the video is muted or not                                                      | Boolean |
| loop         | Sets whether teh audio/video should start over again when finished                          | Boolean |
| volume       | Sets the volume of the audio/video                                                          | Number  |
| className    | Adds a class to the root element, which is a div.                                           | String  |
| themes       | There have 'default, youtube'                                                               | String  |

### Access shaka's player object.

The following is a more advanced setup to illustrate how you can integrate shaka's features in React.

```javascript
import React, { useRef, useEffect } from 'react';
import ShakaPlayer from 'shaka-react-video-player';

function App() {
  const controllerRef = useRef(null);

  useEffect(() => {
    const {
      /** @type {shaka.Player} */ player,
      /** @type {shaka.ui.Overlay} */ ui,
      /** @type {HTMLVideoElement} */ videoElement
    } = controllerRef.current;

    async function loadAsset() {
      // Load an asset.
      await player.load(
        'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'
      );

      // Trigger play.
      videoElement.play();
    }

    loadAsset();
  }, []);

  return <ShakaPlayer ref={controllerRef} />;
}
```

Or check the [example](https://github.com/foridpathan/shaka-react-video-player/tree/master/example) in this repository.

## Integrate with

### Next.js

```javascript
import React from 'react';
import dynamic from 'next/dynamic';

const ShakaPlayer = dynamic(() => import('shaka-react-video-player'), {
  ssr: false
});

export default function Index() {
  return (
    <div>
      <ShakaPlayer
        autoPlay
        src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
      />
    </div>
  );
}
```

When using `next/dynamic` with `{ ssr: false }`, we'll make sure the component is not interpreted by Next.js SSR. As of today, pre-rendering shaka-player's UI is technically not possible due to the fact that it is not written in React (but in plain Javascript). Although, shaka-player heavily relies on browser API's and serves no real purpose on a backend anyways.
