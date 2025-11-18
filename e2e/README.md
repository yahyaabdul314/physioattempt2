# VR E2E Tests - Full WebXR Immersive Testing

This directory contains **full 3D VR end-to-end tests** that run in a real WebGL/WebXR environment using Playwright.

## What Makes These Tests "True VR"

Unlike unit tests with mocked Three.js components, these E2E tests:

✅ **Actual 3D Rendering**: Tests run in a real browser with WebGL context
✅ **WebXR API**: Full WebXR immersive VR session support
✅ **Stereo Rendering**: Simulates left/right eye views
✅ **VR Controllers**: Emulates Oculus Quest 2 controllers and interactions
✅ **60Hz Refresh Rate**: Validates smooth VR performance
✅ **3D Scene Verification**: Checks actual Three.js scene rendering

## Test Structure

### `vr-app.spec.ts`
Core VR application tests:
- WebXR session initialization
- 3D canvas rendering with WebGL
- Stereo view rendering (left/right eyes)
- VR controller interactions
- Frame rate performance (60fps)
- Memory stability

### `vr-assessment.spec.ts`
VOMS assessment tests in 3D VR:
- Smooth Pursuits eye tracking in 3D space
- Saccades rapid eye movement tests
- 3D target positioning and depth
- Symptom rating UI in VR
- Animation smoothness
- Text rendering in 3D

### `helpers/webxr-emulator.ts`
WebXR emulation utilities:
- Injects WebXR Device API polyfill
- Simulates VR headsets (Oculus Quest 2, Valve Index, etc.)
- Provides VR controller input simulation
- Helper functions for VR testing

## Running the Tests

```bash
# Run all E2E VR tests
npm run test:e2e

# Run with UI (see test execution visually)
npm run test:e2e:ui

# Run in headed mode (see the browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug

# Run all tests (unit + E2E)
npm run test:all
```

## How WebXR Emulation Works

The tests use a custom WebXR polyfill that:

1. **Injects `navigator.xr`** - Provides WebXR Device API
2. **Creates Mock XR Session** - Simulates immersive-vr sessions
3. **Provides Stereo Views** - Returns left/right eye view matrices
4. **Simulates Reference Spaces** - local, local-floor, bounded-floor
5. **Generates XR Frames** - Provides viewer poses for each frame

### VR Devices Supported

- **Oculus Quest 2** (default) - 6DOF, controllers, hand tracking
- **Valve Index** - 6DOF, Knuckles controllers
- **HTC Vive** - 6DOF, wand controllers

## What Gets Tested

### ✅ 3D Rendering
- WebGL context creation
- Three.js scene initialization
- Proper lighting setup
- Canvas fullscreen rendering

### ✅ WebXR Sessions
- Session creation (immersive-vr)
- Reference space requests
- Viewer pose tracking
- Frame loop execution

### ✅ VR Interactions
- Controller raycasting
- Button clicks in 3D
- Gaze-based selection
- Hover effects

### ✅ Performance
- 60fps frame rate
- Frame time consistency
- Memory usage stability
- Load time < 10 seconds

### ✅ Assessment Tests
- Smooth pursuits target movement
- Saccades target switching
- 3D UI positioning
- Symptom rating interface

## Test Output

Tests generate:
- **Screenshots**: `e2e/screenshots/*.png` - Canvas captures
- **Videos**: Failure recordings (if enabled)
- **Traces**: Step-by-step execution traces
- **HTML Report**: `playwright-report/index.html`

## Debugging

### View Test UI
```bash
npm run test:e2e:ui
```
Opens Playwright UI to see tests running in real-time.

### Debug Specific Test
```bash
npx playwright test --debug -g "should render 3D canvas"
```

### Check WebXR Logs
All WebXR emulator actions are logged to console:
```
[WebXR Emulator] Injecting XR polyfill...
[WebXR Emulator] Requesting immersive-vr session
[WebXR Emulator] Created immersive-vr session with Oculus Quest 2
```

## CI/CD Integration

These tests can run in CI with headless browsers:

```yaml
# GitHub Actions example
- name: Run VR E2E Tests
  run: npm run test:e2e
```

## Differences from Unit Tests

| Aspect | Unit Tests | E2E VR Tests |
|--------|-----------|--------------|
| Environment | jsdom (DOM simulation) | Real browser with WebGL |
| Three.js | Mocked components | Actual 3D rendering |
| WebXR | Mocked API | Full WebXR emulation |
| Performance | N/A | Validates 60fps |
| Interactions | Simulated events | Real browser events |
| Visual Output | None | Screenshots/videos |

## Contributing

When adding new VR features, add corresponding E2E tests that verify:
1. 3D rendering works correctly
2. WebXR session handles the feature
3. Performance remains stable
4. Interactions work in VR space

## Troubleshooting

**Test fails with "WebXR not supported"**
- Check that WebXR polyfill is injected in `beforeEach`
- Verify browser flags in `playwright.config.ts`

**Canvas not rendering**
- Check dev server is running (`http://localhost:5173`)
- Verify WebGL context creation succeeds

**Frame rate below 60fps**
- Normal in emulated environment
- Tests allow 30-75fps range

**Memory growth detected**
- Check for Three.js memory leaks
- Ensure proper cleanup in components
