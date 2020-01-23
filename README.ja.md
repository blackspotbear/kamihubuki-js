# kamihubuki-js

kamihubuki-js は紙吹雪のための軽量な2D物理エンジンです。JavaScrpt, TypeScript から利用できます。

![confetti](./confetti-anim.gif)

## インストール

パッケージマネージャでインストールします。

```shell
npm install blackspotbear/kamihubuki-js
```

## 使い方

１つの紙吹雪に対し、１つの `Confetti` インスタンスを生成します。 kamihubuki-js は描画機能を持ちません。紙吹雪の描画は別途実装する必要があります。詳細は sample ディレクトリのサンプルを参照ください。

```javascript
// kamihubuki-js の導入。
var kh = require('kamihubuki-js');

// コンフェッティインスタンスの生成。
var co = new kh.Confetti({
    // 初期位置や初速などを与える。
    x: x, y: y,
    vx: vx, vy: vy,
    angle: angle,
    fins: [ // ランダムに２つのフィンを取り付ける。
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

// コンフェッティの更新。
co.update(1 / 30, 0, 0, 0, -100);
```

物理モデルについては[こちら](./how-it-works.ja.md)を参照ください。

## APIリファレンス

`npm run doc` を実行すると doc ディレクトリにAPIリファレンスが生成されます。

## ライセンス

本リポジトリは MIT License の元で公開されています。詳しくは [LICENSE](./LICENSE) をご覧ください。
