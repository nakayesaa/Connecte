import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Particle = {
  vx: number;
  vy: number;
  vz: number;
  phase: number;
};

const ParticleTextThree: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const TEXT = "Connecte";
    const SAMPLING = 3;
    const PARTICLE_SIZE = 0.12;
    const SPAWN_HEIGHT = 30;

    const textCanvas = document.createElement("canvas");
    const ctx = textCanvas.getContext("2d");
    if (!ctx) return;

    textCanvas.width = mount.clientWidth * 2;
    textCanvas.height = mount.clientHeight * 0.5;

    ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    ctx.fillStyle = "white";
    const cssFontSize = Math.floor(textCanvas.height * 0.5);
    ctx.font = `bold ${cssFontSize}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(TEXT, textCanvas.width / 2, textCanvas.height / 2);

    const imageData = ctx.getImageData(
      0,
      0,
      textCanvas.width,
      textCanvas.height,
    ).data;
    const targets: number[] = [];

    for (let y = 0; y < textCanvas.height; y += SAMPLING) {
      for (let x = 0; x < textCanvas.width; x += SAMPLING) {
        const idx = (y * textCanvas.width + x) * 4;
        if (imageData[idx + 3] > 128) {
          const px = x - textCanvas.width / 2;
          const py = textCanvas.height / 2 - y + 60;
          targets.push(px * 0.06, py * 0.06, (Math.random() - 0.5) * 1);
        }
      }
    }

    const particleCount = targets.length / 3;
    const positions = new Float32Array(targets.length);
    const targetsArr = new Float32Array(targets);
    const particlesData: Particle[] = new Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 60;
      positions[ix + 1] = SPAWN_HEIGHT + Math.random() * 10;
      positions[ix + 2] = (Math.random() - 0.5) * 6;
      particlesData[i] = {
        vx: 0,
        vy: -0.2,
        vz: 0,
        phase: Math.random() * Math.PI * 2,
      };
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: PARTICLE_SIZE,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let clock = new THREE.Clock();
    let phase: "falling" | "formed" = "falling";
    let formedAt = 0;

    const mouse = new THREE.Vector2(-1000, -1000);
    mount.addEventListener("mousemove", (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    const raycaster = new THREE.Raycaster();

    let lastTime = 0;
    const FPS = 30;
    const INTERVAL = 1000 / FPS;

    function animate(time: number) {
      requestAnimationFrame(animate);
      if (time - lastTime < INTERVAL) return;
      lastTime = time;

      const dt = clock.getDelta();
      const pos = geometry.getAttribute("position") as THREE.BufferAttribute;

      if (phase === "falling") {
        let settled = 0;
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const tx = targetsArr[ix];
          const ty = targetsArr[ix + 1];

          const dx = tx - pos.array[ix];
          const dy = ty - pos.array[ix + 1];

          pos.array[ix] += dx * 0.07;
          pos.array[ix + 1] += dy * 0.07;

          if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) settled++;
        }
        if (settled > particleCount * 0.8) {
          phase = "formed";
          formedAt = performance.now();
        }
      }
      if (phase === "formed") {
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);

        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const px = pos.array[ix];
          const py = pos.array[ix + 1];
          const pz = pos.array[ix + 2];

          const dx = px - vector.x;
          const dy = py - vector.y;
          const dz = pz - vector.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          const radius = 3;
          if (dist < radius && dist > 0.001) {
            const force = (radius - dist) * 0.2;
            pos.array[ix] += (dx / dist) * force;
            pos.array[ix + 1] += (dy / dist) * force;
            pos.array[ix + 2] += (dz / dist) * force;
          }
          pos.array[ix] += (targetsArr[ix] - pos.array[ix]) * 0.02;
          pos.array[ix + 1] += (targetsArr[ix + 1] - pos.array[ix + 1]) * 0.02;
          pos.array[ix + 2] += (targetsArr[ix + 2] - pos.array[ix + 2]) * 0.02;
        }
      }

      pos.needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate(0);

    function resize() {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

export default ParticleTextThree;
