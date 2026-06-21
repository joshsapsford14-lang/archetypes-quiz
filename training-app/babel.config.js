module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // jsxImportSource lets NativeWind transform className -> styles.
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // NOTE: react-native-worklets/plugin (Reanimated 4) is added automatically
    // by babel-preset-expo in SDK 56 — do not add it manually here.
  };
};
