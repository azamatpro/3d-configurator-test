import { useEffect, useRef } from 'preact/hooks';
import { signal } from '@preact/signals';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';

// Signal for color state
export const selectedColor = signal('#ffffff');

const Configurator = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    const scene = sceneRef.current;

    // Adjust camera FOV and position for the smaller teapot size
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Camera and controls
    camera.position.set(0, 100, 350);
    const controls = new OrbitControls(camera, renderer.domElement);

    // Add ambient light and directional light to the scene
    const light = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Teapot geometry and material
    const teapotSize = 300;
    const tess = 15;
    const geometry = new TeapotGeometry(teapotSize, tess, true, true, true, true, true);
    const material = new THREE.MeshStandardMaterial({ color: selectedColor.value });

    const teapot = new THREE.Mesh(geometry, material);
    teapot.scale.set(0.2, 0.2, 0.2);
    scene.add(teapot);

    // Update material color when selectedColor signal changes
    selectedColor.subscribe((color) => {
      material.color.set(color);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block', // Prevents canvas scrollbar from appearing
        }}
      />
    </div>
  );
};

export default Configurator;
