"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight Three.js scene — floating glass-like geometries for the hero.
 * Respects prefers-reduced-motion and pauses when off-screen / hidden.
 */
export function HeroScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const accent = new THREE.Color("#2563eb");
    const materials = [
      new THREE.MeshStandardMaterial({
        color: accent,
        transparent: true,
        opacity: 0.22,
        metalness: 0.6,
        roughness: 0.25,
        wireframe: false,
      }),
      new THREE.MeshStandardMaterial({
        color: "#3b82f6",
        transparent: true,
        opacity: 0.15,
        metalness: 0.4,
        roughness: 0.35,
        wireframe: true,
      }),
    ];

    const geometries: THREE.BufferGeometry[] = [
      new THREE.IcosahedronGeometry(0.7, 0),
      new THREE.OctahedronGeometry(0.55, 0),
      new THREE.TorusGeometry(0.45, 0.12, 12, 32),
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
    ];

    const meshes = geometries.map((geo, i) => {
      const mesh = new THREE.Mesh(geo, materials[i % materials.length]);
      mesh.position.set(
        (i % 2 === 0 ? -1.2 : 1.4) + (i * 0.15),
        1.2 - i * 0.7,
        -0.5 + (i % 3) * 0.3
      );
      group.add(mesh);
      return mesh;
    });

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    const point = new THREE.PointLight(0x2563eb, 1.2, 20);
    point.position.set(2, 3, 4);
    scene.add(ambient, point);

    let frame = 0;
    let running = true;
    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && document.visibilityState === "visible";
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!running) return;
      frame += 0.005;
      group.rotation.y = frame * 0.35;
      group.rotation.x = Math.sin(frame * 0.4) * 0.12;
      meshes.forEach((m, i) => {
        m.rotation.x += 0.003 + i * 0.0005;
        m.rotation.y += 0.004 + i * 0.0004;
        m.position.y += Math.sin(frame * 1.5 + i) * 0.0015;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden
    />
  );
}
