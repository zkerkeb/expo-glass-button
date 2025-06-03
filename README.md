# HoldToConfirmButton

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A modern React Native component with an elegant "hold-to-confirm" effect. Green translucent rectangular button with progressive fill animation and flash confirmation effect.

## ✨ Features

- 🟢 **Green translucent design** - Modern and stylish effect
- 🎯 **Hold-to-confirm** - Prevents accidental taps
- 🎨 **Smooth animations** - 60fps with react-native-reanimated
- 📱 **Large size** - Imposing and easy-to-use button
- ⚡ **Flash effect** - Elegant visual confirmation
- 🔧 **TypeScript** - Full support with IntelliSense
- 📦 **Lightweight** - Simple and performant component

## 🚀 Installation

```bash
# Required dependencies
npx expo install react-native-reanimated expo-linear-gradient expo-blur
```

## 💡 Basic Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { HoldToConfirmButton } from './src/components/HoldToConfirmButton';

export default function App() {
  const handleConfirm = () => {
    console.log('Action confirmed!');
    // Your logic here
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HoldToConfirmButton
        label="Hold to confirm"
        onComplete={handleConfirm}
      />
    </View>
  );
}
```

## 🎛️ Advanced Example

```tsx
import React from 'react';
import { HoldToConfirmButton } from './src/components/HoldToConfirmButton';

export default function PaymentScreen() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await processPayment();
      // Success
    } catch (error) {
      // Error
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <HoldToConfirmButton
      label="Hold to pay"
      durationMs={2000}
      onComplete={handlePayment}
      disabled={isProcessing}
      width={350}
      height={120}
    />
  );
}
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onComplete` | `() => void` | **Required** | Function called after confirmation |
| `label` | `string` | `"Hold to confirm"` | Text displayed in the button |
| `durationMs` | `number` | `1500` | Duration in ms to trigger the action |
| `width` | `number` | `380` | Button width in pixels |
| `height` | `number` | `140` | Button height in pixels |
| `disabled` | `boolean` | `false` | Disables the button (40% opacity) |
| `style` | `ViewStyle` | `undefined` | Custom styles for the container |

## 🎨 Design

### Appearance
- **Shape**: Rectangle with slightly rounded corners (8px)
- **Color**: Translucent green `rgba(46, 204, 113, 0.6)`
- **Border**: Intense green `rgba(46, 204, 113, 0.9)`
- **Text**: Bold white 28px
- **Shadow**: Diffuse green shadow for depth effect

### Fill Animation
- **Dark green gradient**: 4 shades of green that blend
- **Direction**: Left to right with diagonal effect
- **Duration**: Configurable (default 1.5s)
- **Easing**: Smooth and natural animation

### Flash Effect
- **Bright white flash** on completion
- **Duration**: 300ms (150ms appear + 150ms disappear)
- **Reset**: Automatic return to initial state

## 🔧 Behavior

1. **Press**: Fill animation starts
2. **Hold**: Gradient progresses from 0% to 100%
3. **Early release**: Animation cancelled, returns to 0%
4. **Completion**: Flash + `onComplete()` + automatic reset
5. **Disabled**: No interaction, reduced opacity

## 🌟 Use Cases

- **Payments** - Transaction confirmations
- **Deletion** - Destructive actions
- **Validation** - Important forms
- **Security** - Sensitive actions
- **Gaming** - Game interactions

## ⚡ Performance

- **60fps animation** on UI thread
- **No unnecessary re-renders**
- **Optimized shared values**
- **Native gestures** with Pressable

## 🔧 Customization

```tsx
// Custom styling
<HoldToConfirmButton
  onComplete={handleAction}
  style={{
    marginVertical: 20,
    shadowOpacity: 0.5,
  }}
  width={400}
  height={100}
/>
```

## 📱 Compatibility

- ✅ **iOS** - Native blur effect
- ✅ **Android** - Translucent fallback
- ✅ **Expo** - SDK 50+
- ✅ **TypeScript** - Full support

## 🛠️ Development

```bash
# Clone the project
git clone <repo-url>

# Installation
npm install

# Launch
npm start
```

## 📄 License

MIT © 2024

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request. 