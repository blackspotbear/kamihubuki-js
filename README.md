# kamihubuki-js

kamihubuki-js is a lightweight 2D confetti physics engine in Javascript and TypeScript.

![confetti](./confetti-anim.gif)

## Install

You can install using package manager.

```shell
npm install blackspotbear/kamihubuki-js
```

## Usage

The following is a minimal example around createing and updating confetti.

```javascript
var kh = require('path/to/kamihubuki-js');

// create a confetti instance.
var co = new kh.Confetti({
    // initial position, velocity, etc...
    x: x, y: y,
    vx: vx, vy: vy,
    angle: angle,
    fins: [ // add fins that rotate confetti.
        {
            angle: (Math.random() * 2 - 1) * (Math.PI / 2),
            size: 1,
            armAngle: 0,
            armLength: 1
        },
        {
            angle: (Math.random() * 2 - 1) * (Math.PI / 2),
            size: 2,
            armAngle: Math.random() * Math.PI,
            armLength: 1
        }
    ],
    av: 0,
    M: 0.5,
    K: 0.4,
    I: 5,
    RD: 0.99
});

// Update confetti every frame.
co.update(1 / 30, 0, 0, 0, -100);
```

More details, see [this documentation](./how-it-works.md).

## API Reference

To get API reference run:

```sh
npm run doc
```

## LICENSE

This software is released under the MIT License, see LICENSE.txt.
