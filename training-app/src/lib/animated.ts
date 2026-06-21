import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";

// Let NativeWind's `className` work on Reanimated's animated primitives so we can
// style entering/exiting animated views with Tailwind classes app-wide.
// Importing this module once (in the root layout) applies the interop.
cssInterop(Animated.View, { className: "style" });
cssInterop(Animated.Text, { className: "style" });
cssInterop(Animated.ScrollView, { className: "style" });
