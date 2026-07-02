// Hand-authored Lottie: five brand-colored bars breathing in a loop,
// with a pulsing dot riding the tallest bar. 3s loop @ 30fps.

const EASE_I = { x: [0.45], y: [1] };
const EASE_O = { x: [0.55], y: [0] };

function bar(
  ind: number,
  x: number,
  color: [number, number, number],
  lo: number,
  hi: number,
  phase: boolean
) {
  const a = phase ? lo : hi;
  const b = phase ? hi : lo;
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: `bar${ind}`,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [x, 210, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: [
          { i: EASE_I, o: EASE_O, t: 0, s: [100, a, 100] },
          { i: EASE_I, o: EASE_O, t: 45, s: [100, b, 100] },
          { t: 90, s: [100, a, 100] },
        ],
      },
    },
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            p: { a: 0, k: [0, -80] },
            s: { a: 0, k: [40, 160] },
            r: { a: 0, k: 7 },
          },
          { ty: "fl", c: { a: 0, k: [...color, 1] }, o: { a: 0, k: 100 } },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
  };
}

// brand palette: xpc blues, declarative green, amber, imperative rust
const BLUE: [number, number, number] = [0.227, 0.643, 0.863];
const DEEP: [number, number, number] = [0.169, 0.576, 0.804];
const GREEN: [number, number, number] = [0.055, 0.478, 0.373];
const AMBER: [number, number, number] = [0.91, 0.64, 0.24];
const RUST: [number, number, number] = [0.757, 0.29, 0.2];

const TITLE_LOTTIE = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 420,
  h: 230,
  nm: "byod-bars",
  ddd: 0,
  assets: [],
  layers: [
    bar(1, 60, BLUE, 45, 95, true),
    bar(2, 135, GREEN, 80, 40, false),
    bar(3, 210, AMBER, 55, 100, true),
    bar(4, 285, DEEP, 90, 50, false),
    bar(5, 360, RUST, 35, 75, true),
    {
      ddd: 0,
      ind: 6,
      ty: 4,
      nm: "pulse",
      ks: {
        o: {
          a: 1,
          k: [
            { i: EASE_I, o: EASE_O, t: 0, s: [90] },
            { i: EASE_I, o: EASE_O, t: 45, s: [30] },
            { t: 90, s: [90] },
          ],
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { i: { x: 0.45, y: 1 }, o: { x: 0.55, y: 0 }, t: 0, s: [210, 122, 0], to: [0, -12, 0], ti: [0, 12, 0] },
            { i: { x: 0.45, y: 1 }, o: { x: 0.55, y: 0 }, t: 45, s: [210, 50, 0], to: [0, 12, 0], ti: [0, -12, 0] },
            { t: 90, s: [210, 122, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [18, 18] },
            },
            { ty: "fl", c: { a: 0, k: [...AMBER, 1] }, o: { a: 0, k: 100 } },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
  ],
};

export default TITLE_LOTTIE;
