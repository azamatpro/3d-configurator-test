import { useEffect, useRef } from 'preact/hooks';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';
import { bodyColor } from '../../utils';

const config = {
  fov: {
    mobile: 60,
    tablet: 55,
    desktop: 50,
  },
  teapotScale: {
    mobile: 0.15,
    tablet: 0.18,
    desktop: 0.2,
  },
  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },
};

const TeapotSean = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = new THREE.PerspectiveCamera(config.fov.desktop, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Camera and controls
    camera.position.set(0, 100, 350);
    const controls = new OrbitControls(camera, renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Teapot geometry and material
    const teapotSize = 300;
    const tess = 15;
    const geometry = new TeapotGeometry(teapotSize, tess, true, true, true, true, true);
    const material = new THREE.MeshStandardMaterial({ color: bodyColor.value });

    const teapot = new THREE.Mesh(geometry, material);
    scene.add(teapot);

    // Update material color dynamically
    bodyColor.subscribe((color) => {
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
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width < config.breakpoints.mobile) {
        camera.fov = config.fov.mobile;
        teapot.scale.set(config.teapotScale.mobile, config.teapotScale.mobile, config.teapotScale.mobile);
      } else if (width < config.breakpoints.tablet) {
        camera.fov = config.fov.tablet;
        teapot.scale.set(config.teapotScale.tablet, config.teapotScale.tablet, config.teapotScale.tablet);
      } else {
        camera.fov = config.fov.desktop;
        teapot.scale.set(config.teapotScale.desktop, config.teapotScale.desktop, config.teapotScale.desktop);
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

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
          display: 'block',
        }}
      />
    </div>
  );
};

export default TeapotSean;
