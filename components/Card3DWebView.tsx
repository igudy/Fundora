import { useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';
import { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';

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

function buildHTML(textureBase64: string, modelBase64: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<style>
  * { margin: 0; padding: 0; }
  body { overflow: hidden; background: #E8ECEF; touch-action: none; }
  canvas { display: block; width: 100vw; height: 100vh; }
</style>
</head>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
<script>
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xE8ECEF);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(2, 3, 5);
  scene.add(dirLight);

  // Load texture from base64
  const texLoader = new THREE.TextureLoader();
  const texture = texLoader.load('data:image/png;base64,${textureBase64}');
  texture.flipY = false;

  // Decode GLB from base64
  const glbBinary = Uint8Array.from(atob('${modelBase64}'), c => c.charCodeAt(0));

  let model = null;

  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.parse(glbBinary.buffer, '', (gltf) => {
    model = gltf.scene;

    // Apply texture using Blender UVs
    model.traverse((child) => {
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
  }, (err) => {
    console.error('GLB parse error:', err);
  });

  // Touch rotation
  let isDragging = false;
  let lastX = 0, lastY = 0;
  let velX = 0, velY = 0;
  let targetRotation = null;

  document.addEventListener('touchstart', (e) => {
    isDragging = true;
    targetRotation = null;
    velX = 0; velY = 0;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging || !model) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    model.rotation.y += dx * 0.008;
    model.rotation.x += dy * 0.008;
    velX = dy * 0.008;
    velY = dx * 0.008;
  }, { passive: false });

  document.addEventListener('touchend', () => { isDragging = false; });

  // Mouse rotation (for simulator)
  document.addEventListener('mousedown', (e) => {
    isDragging = true;
    targetRotation = null;
    velX = 0; velY = 0;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging || !model) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    model.rotation.y += dx * 0.008;
    model.rotation.x += dy * 0.008;
    velX = dy * 0.008;
    velY = dx * 0.008;
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  // Listen for commands from React Native
  window.addEventListener('message', (e) => {
    if (!model) return;
    try {
      const cmd = JSON.parse(e.data);
      if (cmd.type === 'rotateBy') {
        const snapped = Math.round(model.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
        targetRotation = { x: 0, y: snapped + cmd.dy };
        velX = 0; velY = 0;
      } else if (cmd.type === 'zoomBy') {
        camera.position.z = Math.min(10, Math.max(2.5, camera.position.z + cmd.delta));
      }
    } catch {}
  });

  function animate() {
    requestAnimationFrame(animate);

    if (model) {
      if (targetRotation && !isDragging) {
        const lerp = 0.08;
        const dx = targetRotation.x - model.rotation.x;
        const dy = targetRotation.y - model.rotation.y;
        model.rotation.x += dx * lerp;
        model.rotation.y += dy * lerp;
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
          model.rotation.x = targetRotation.x;
          model.rotation.y = targetRotation.y;
          targetRotation = null;
        }
      } else if (!isDragging) {
        model.rotation.x += velX;
        model.rotation.y += velY;
        velX *= 0.92;
        velY *= 0.92;
        if (Math.abs(velX) < 0.0001) velX = 0;
        if (Math.abs(velY) < 0.0001) velY = 0;
      }
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
</script>
</body>
</html>`;
}

interface Card3DWebViewProps {
  height?: number;
}

export function Card3DWebView({ height = 320 }: Card3DWebViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Load texture
        const texAsset = Asset.fromModule(
          require('../assets/3d/texture/cardTexture/Card_DefaultMaterial_BaseColor.png'),
        );
        // Load GLB model
        const glbAsset = Asset.fromModule(require('../assets/3d/card.glb'));
        await Promise.all([texAsset.downloadAsync(), glbAsset.downloadAsync()]);

        const texFile = new File(texAsset.localUri || texAsset.uri);
        const texBytes = await texFile.bytes();
        let texBinary = '';
        for (let i = 0; i < texBytes.length; i++) {
          texBinary += String.fromCharCode(texBytes[i]);
        }
        const texBase64 = btoa(texBinary);

        const glbFile = new File(glbAsset.localUri || glbAsset.uri);
        const glbBytes = await glbFile.bytes();
        let glbBinary = '';
        for (let i = 0; i < glbBytes.length; i++) {
          glbBinary += String.fromCharCode(glbBytes[i]);
        }
        const glbBase64 = btoa(glbBinary);

        setHtml(buildHTML(texBase64, glbBase64));
      } catch (err) {
        console.error('Failed to load texture for WebView 3D:', err);
      }
    })();
  }, []);

  const sendCommand = (cmd: object) => {
    webViewRef.current?.postMessage(JSON.stringify(cmd));
  };

  const rotateBy = (dy: number) => sendCommand({ type: 'rotateBy', dy });
  const zoomBy = (delta: number) => sendCommand({ type: 'zoomBy', delta });

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          width: '100%',
          height,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: '#E8ECEF',
        }}>
        {html ? (
          <WebView
            ref={webViewRef}
            source={{ html }}
            style={{ flex: 1, backgroundColor: '#E8ECEF' }}
            scrollEnabled={false}
            bounces={false}
            onLoad={() => setLoading(false)}
            javaScriptEnabled
            originWhitelist={['*']}
          />
        ) : null}

        {/* 3D badge */}
        {!loading && (
          <View
            pointerEvents="none"
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

        {(loading || !html) && (
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
      </View>

      {/* Controls */}
      <View className="mt-4 flex-row items-center justify-center" style={{ gap: 12 }}>
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
