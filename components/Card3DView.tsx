import { useEffect, useRef, useState } from 'react';
import { View, Text, PanResponder, LogBox, Pressable, Platform } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer, loadTextureAsync } from 'expo-three';
import { Asset } from 'expo-asset';
import * as THREE from 'three';
import Svg, { Path } from 'react-native-svg';
// @ts-ignore - three.js examples don't ship type declarations
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Suppress non-critical warnings (LogBox covers on-screen banners)
LogBox.ignoreLogs([
  "THREE.GLTFLoader: Couldn't load texture",
  'EXGL: gl.pixelStorei()',
  'THREE.WebGLRenderer: EXT_color_buffer_float',
  'invalid package.json configuration',
]);

// Also suppress the same messages in the Metro console output.
// The GLTFLoader fires these when it fails to decode embedded textures,
// which is expected because we load textures separately.
const _origConsoleError = console.error;
const _origConsoleWarn = console.warn;
const _origConsoleLog = console.log;
const _suppressPatterns = [
  /GLTFLoader.*Couldn't load texture/,
  /gl\.pixelStorei/,
  /EXT_color_buffer_float/,
  /Cannot create URL for blob/,
  /__turboModuleProxy/,
  /invalid package\.json configuration/,
];
function _isSuppressed(...args: any[]) {
  const msg = args.map(String).join(' ');
  return _suppressPatterns.some((p) => p.test(msg));
}
console.error = (...args: any[]) => { if (!_isSuppressed(...args)) _origConsoleError(...args); };
console.warn = (...args: any[]) => { if (!_isSuppressed(...args)) _origConsoleWarn(...args); };
console.log = (...args: any[]) => { if (!_isSuppressed(...args)) _origConsoleLog(...args); };

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cardModel = require('../assets/3d/card.glb');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cardBaseColor = require('../assets/3d/texture/cardTexture/Card_DefaultMaterial_BaseColor.png');

function Rotate3DIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"
        stroke="#9CA3AF"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M22 12c0-1.66-.41-3.22-1.13-4.6"
        stroke="#9CA3AF"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M22 4v4h-4"
        stroke="#9CA3AF"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8v8M8 12h8"
        stroke="#9CA3AF"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  );
}

function ZoomIcon({ type }: { type: 'in' | 'out' }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
        stroke="#6B7280"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={type === 'in' ? 'M11 8v6M8 11h6' : 'M8 11h6'}
        stroke="#6B7280"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' | 'flip' }) {
  if (direction === 'flip') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M17 1l4 4-4 4"
          stroke="#6B7280"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 11V9a4 4 0 014-4h14"
          stroke="#6B7280"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7 23l-4-4 4-4"
          stroke="#6B7280"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 13v2a4 4 0 01-4 4H3"
          stroke="#6B7280"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d={`M${direction === 'left' ? '19 12H5M5 12l6-6M5 12l6 6' : '5 12h14M19 12l-6-6M19 12l-6 6'}`}
        stroke="#6B7280"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface Card3DViewProps {
  height?: number;
}

export function Card3DView({ height = 320 }: Card3DViewProps) {
  const ZOOM_MIN = 2.5;
  const ZOOM_MAX = 10;
  const ZOOM_DEFAULT = 5;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [glUnavailable, setGlUnavailable] = useState(false);
  const glReadyRef = useRef(false);

  // Detect if GL never initializes (iOS Simulator / unsupported platforms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!glReadyRef.current) {
        setGlUnavailable(true);
        setLoading(false);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const zoomRef = useRef(ZOOM_DEFAULT);
  const zoomTargetRef = useRef<number | null>(null);
  const lastPinchDistRef = useRef<number | null>(null);
  const isPinchingRef = useRef(false);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const animateToRotation = (x: number, y: number) => {
    targetRef.current = { x, y };
    velocityRef.current = { x: 0, y: 0 };
  };

  const rotateBy = (dy: number) => {
    const baseY = targetRef.current?.y ?? rotationRef.current.y;
    const snapped = Math.round(baseY / (Math.PI / 2)) * (Math.PI / 2);
    animateToRotation(0, snapped + dy);
  };

  const zoomBy = (delta: number) => {
    const base = zoomTargetRef.current ?? zoomRef.current;
    zoomTargetRef.current = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, base + delta));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        isDraggingRef.current = true;
        targetRef.current = null;
        velocityRef.current = { x: 0, y: 0 };
        lastTouchRef.current = { x: gestureState.x0, y: gestureState.y0 };
        isPinchingRef.current = evt.nativeEvent.touches.length >= 2;
        lastPinchDistRef.current = null;
      },
      onPanResponderMove: (evt) => {
        const touches = evt.nativeEvent.touches;

        if (touches.length >= 2) {
          isPinchingRef.current = true;
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (lastPinchDistRef.current !== null) {
            const delta = (lastPinchDistRef.current - dist) * 0.02;
            zoomRef.current = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomRef.current + delta));
          }
          lastPinchDistRef.current = dist;
          return;
        }

        if (isPinchingRef.current) return;

        const dx = touches[0].pageX - lastTouchRef.current.x;
        const dy = touches[0].pageY - lastTouchRef.current.y;
        lastTouchRef.current = { x: touches[0].pageX, y: touches[0].pageY };

        const sensitivity = 0.008;
        rotationRef.current.y += dx * sensitivity;
        rotationRef.current.x += dy * sensitivity;

        velocityRef.current = { x: dy * sensitivity, y: dx * sensitivity };
      },
      onPanResponderRelease: () => {
        isDraggingRef.current = false;
        isPinchingRef.current = false;
        lastPinchDistRef.current = null;
      },
    }),
  ).current;

  const onContextCreate = async (gl: any) => {
    glReadyRef.current = true;
    try {
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      renderer.setClearColor(0xe8ecef, 1);

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        45,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, ZOOM_DEFAULT);
      cameraRef.current = camera;

      scene.add(new THREE.AmbientLight(0xffffff, 1));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(2, 3, 5);
      scene.add(dirLight);

      // Load the base color texture via expo-three (RN-compatible)
      const texture = await loadTextureAsync({ asset: cardBaseColor });
      // Fix UV orientation — expo-three marks textures as DataTexture which
      // skips the default Y-flip. Toggle flipY to correct the mapping.
      texture.flipY = !texture.flipY;
      texture.needsUpdate = true;

      // Load GLB model
      const asset = Asset.fromModule(cardModel);
      await asset.downloadAsync();
      const uri = asset.localUri || asset.uri;
      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();

      // Polyfill Blob for RN compatibility during parse
      const g = globalThis as any;
      const OrigBlob = g.Blob;
      g.Blob = function SafeBlob(parts?: any[], options?: any) {
        const safeParts = (parts || []).map((p: any) =>
          p instanceof ArrayBuffer ? new Uint8Array(p) : p,
        );
        try {
          return new OrigBlob(safeParts, options);
        } catch {
          return new OrigBlob([''], options);
        }
      } as any;
      g.Blob.prototype = OrigBlob.prototype;

      const loader = new GLTFLoader();
      const gltf = await new Promise<any>((resolve, reject) => {
        loader.parse(arrayBuffer, '', resolve, reject);
      });

      g.Blob = OrigBlob;

      const model = gltf.scene;

      // Apply the loaded texture — keep original UVs from Blender
      model.traverse((child: any) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.FrontSide,
          });
        }
      });

      // Center and scale
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 4.0 / maxDim;
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));

      scene.add(model);
      setLoading(false);

      // Render loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Smooth animated transition to target rotation (arrow buttons)
        if (targetRef.current && !isDraggingRef.current) {
          const lerp = 0.08;
          const dx = targetRef.current.x - rotationRef.current.x;
          const dy = targetRef.current.y - rotationRef.current.y;
          rotationRef.current.x += dx * lerp;
          rotationRef.current.y += dy * lerp;

          if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
            rotationRef.current.x = targetRef.current.x;
            rotationRef.current.y = targetRef.current.y;
            targetRef.current = null;
          }
        }
        // Inertia from swipe
        else if (!isDraggingRef.current) {
          rotationRef.current.x += velocityRef.current.x;
          rotationRef.current.y += velocityRef.current.y;
          velocityRef.current.x *= 0.92;
          velocityRef.current.y *= 0.92;

          if (Math.abs(velocityRef.current.x) < 0.0001) velocityRef.current.x = 0;
          if (Math.abs(velocityRef.current.y) < 0.0001) velocityRef.current.y = 0;
        }

        model.rotation.x = rotationRef.current.x;
        model.rotation.y = rotationRef.current.y;

        // Smooth zoom animation (button-driven)
        if (zoomTargetRef.current !== null) {
          const dz = zoomTargetRef.current - zoomRef.current;
          zoomRef.current += dz * 0.1;
          if (Math.abs(dz) < 0.01) {
            zoomRef.current = zoomTargetRef.current;
            zoomTargetRef.current = null;
          }
        }
        camera.position.z = zoomRef.current;

        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      animate();
    } catch (err: any) {
      console.error('3D render error:', err);
      setError(err.message || 'Failed to render 3D');
      setLoading(false);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        {...panResponder.panHandlers}
        style={{
          width: '100%',
          height,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: '#E8ECEF',
        }}>
        <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />

        {/* 3D badge */}
        {!loading && !error && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.85)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              gap: 4,
            }}>
            <Rotate3DIcon />
            <Text className="font-jakarta-medium text-xs text-gray-400">3D</Text>
          </View>
        )}

        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E8ECEF',
            }}>
            <Text className="font-jakarta text-sm text-gray-400">Loading 3D model...</Text>
          </View>
        )}

        {(error || glUnavailable) && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E8ECEF',
              paddingHorizontal: 32,
            }}>
            <Rotate3DIcon size={32} />
            <Text className="mt-3 font-jakarta-medium text-sm text-gray-500">
              {glUnavailable
                ? '3D preview requires a physical device'
                : 'Could not load model'}
            </Text>
            {glUnavailable && (
              <Text className="mt-1 text-center font-jakarta text-xs text-gray-400">
                The {Platform.OS} simulator does not support OpenGL rendering
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Controls */}
      <View className="mt-4 flex-row items-center justify-center" style={{ gap: 12 }}>
        {/* Zoom out */}
        <Pressable
          onPress={() => zoomBy(1)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ZoomIcon type="out" />
        </Pressable>

        {/* Left — rotate 90° left */}
        <Pressable
          onPress={() => rotateBy(-Math.PI / 2)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowIcon direction="left" />
        </Pressable>

        {/* Flip — rotate 180° from current position */}
        <Pressable
          onPress={() => rotateBy(Math.PI)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowIcon direction="flip" />
        </Pressable>

        {/* Right — rotate 90° right from current position */}
        <Pressable
          onPress={() => rotateBy(Math.PI / 2)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowIcon direction="right" />
        </Pressable>

        {/* Zoom in */}
        <Pressable
          onPress={() => zoomBy(-1)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ZoomIcon type="in" />
        </Pressable>
      </View>

      {/* Guide */}
      <View className="mt-2 flex-row items-center" style={{ gap: 5 }}>
        <Rotate3DIcon size={12} />
        <Text className="font-jakarta text-xs text-gray-400">
          Swipe to rotate · Pinch to zoom
        </Text>
      </View>
    </View>
  );
}
