const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Filter out `.svg` from asset extensions
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);

// Add `.svg` to source extensions
defaultConfig.resolver.sourceExts = [
  ...defaultConfig.resolver.sourceExts,
  "svg",
];

// Add the SVG transformer
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

module.exports = defaultConfig;
