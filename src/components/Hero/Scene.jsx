import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* The real logo mark, traced from the logo file (pixel coordinates).  */
/* ------------------------------------------------------------------ */
const RAW = {
  left: [[349, 919], [440, 1077], [350, 1231], [259, 1076]],
  center: [[439, 764], [621, 766], [714, 921], [623, 1078], [804, 1080], [715, 1234], [533, 1233], [440, 1077], [530, 920]],
  right: [[803, 767], [895, 923], [804, 1080], [714, 921]],
};
// centre the mark on (0,0) and make it 2 units tall
const norm = ([x, y]) => new THREE.Vector2((x - 577) / 235.5, -(y - 999.5) / 235.5);

// where each piece starts (scattered in 3D) and how it spins in
const PIECES = [
  { key: "left", from: [-4.5, -1.5, 3], rot: [1.3, -1.5, 0.9], color: "#27c900" },
  { key: "center", from: [0.5, 3.2, -3], rot: [-1, 1.2, -0.7], color: "#2de300" },
  { key: "right", from: [4.5, 1.6, 2.5], rot: [0.9, 1.6, -1.1], color: "#27c900" },
];

const extrude = (shape, depth, bevel) => {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.65,
    bevelSegments: 5,
    curveSegments: 1,
  });
  g.translate(0, 0, -depth / 2);
  return g;
};

/* soft studio reflections so the metal actually looks 3D */
function Studio() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* a green light that follows the pointer, so the surface glints as you move */
function PointerLight() {
  const light = useRef();
  useFrame((state) => {
    if (reduceMotion) return;
    light.current.position.set(state.pointer.x * 5, state.pointer.y * 3, 3.5);
  });
  return <pointLight ref={light} position={[0, 0, 3.5]} intensity={40} color="#7dff4d" distance={14} />;
}

/* ------------------------------ logo ------------------------------ */
function Logo3D() {
  const group = useRef();
  const parts = useRef([]);
  const intro = useRef(reduceMotion ? 1 : 0);
  const { viewport, size } = useThree();
  const wide = size.width > 820;

  const geometries = useMemo(
    () => PIECES.map((p) => extrude(new THREE.Shape(RAW[p.key].map(norm)), 0.5, 0.07)),
    [],
  );

  useFrame((state, delta) => {
    if (reduceMotion) return;
    const t = state.clock.elapsedTime;
    intro.current = Math.min(1, intro.current + delta / 2.4);
    const e = 1 - Math.pow(1 - intro.current, 4); // ease-out
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    const g = group.current;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.55 + Math.sin(t * 0.4) * 0.12 + scroll * 1.6, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.35 + scroll * 0.3, 3, delta);
    g.position.y = Math.sin(t * 0.9) * 0.08;

    parts.current.forEach((p, i) => {
      const d = PIECES[i];
      const k = 1 - e + scroll * 0.45; // flies in on load, drifts apart on scroll
      p.position.set(
        d.from[0] * k,
        d.from[1] * k,
        d.from[2] * k + Math.sin(t * 1.1 + i * 2) * 0.12 * e + (i - 1) * 0.18 * e,
      );
      p.rotation.set(d.rot[0] * (1 - e), d.rot[1] * (1 - e), d.rot[2] * (1 - e));
    });
  });

  const scale = wide ? Math.min(1.55, viewport.height / 3.4) : Math.min(1, viewport.width / 3.4);

  return (
    <group
      position={wide ? [viewport.width * 0.2, 0, 0] : [0, viewport.height * 0.2, 0]}
      scale={scale}
    >
      <group ref={group} rotation={[0.15, -0.3, 0]}>
        <Rings />
        {PIECES.map((p, i) => (
          <mesh
            key={p.key}
            ref={(el) => (parts.current[i] = el)}
            geometry={geometries[i]}
            position={[0, 0, (i - 1) * 0.18]}
          >
            <meshPhysicalMaterial
              color={p.color}
              metalness={0.45}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive="#1fb800"
              emissiveIntensity={0.22}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------- hexagon rings that slowly turn around the logo ------------- */
function Rings() {
  const group = useRef();
  const geometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((_, delta) => {
    if (reduceMotion) return;
    group.current.children.forEach((c, i) => {
      c.rotation.z += delta * (i % 2 ? -0.22 : 0.16);
    });
  });

  return (
    <group ref={group} position={[0, 0, -0.4]}>
      <line geometry={geometry} scale={2.15} rotation={[0.5, 0.2, 0]}>
        <lineBasicMaterial color="#2de300" transparent opacity={0.4} />
      </line>
      <line geometry={geometry} scale={2.75} rotation={[-0.35, 0.3, 0]}>
        <lineBasicMaterial color="#2de300" transparent opacity={0.22} />
      </line>
      <line geometry={geometry} scale={3.4} rotation={[0.15, -0.25, 0]}>
        <lineBasicMaterial color="#eef0dc" transparent opacity={0.1} />
      </line>
    </group>
  );
}

/* ------------------- drifting data-dust in the background ------------------- */
function Particles({ count }) {
  const ref = useRef();
  const positions = useMemo(() => {
    let s = 11;
    const r = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + r() * 7;
      const theta = r() * Math.PI * 2;
      const phi = Math.acos(2 * r() - 1);
      a[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      a[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      a[i * 3 + 2] = radius * Math.cos(phi) - 2;
    }
    return a;
  }, [count]);

  useFrame((state, delta) => {
    if (reduceMotion) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.position.x = state.pointer.x * 0.35;
    ref.current.position.y = state.pointer.y * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#2de300"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------- floating shards for depth & parallax ---------------- */
function Floaters({ count }) {
  const { viewport } = useThree();
  const refs = useRef([]);

  const geometry = useMemo(() => {
    // one rhombus from the logo, centred on its own middle
    const pts = RAW.left.map(([x, y]) => new THREE.Vector2((x - 349.5) / 235.5, -(y - 1075.75) / 235.5));
    return extrude(new THREE.Shape(pts), 0.25, 0.04);
  }, []);

  const items = useMemo(() => {
    let s = 7;
    const r = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    return Array.from({ length: count }, (_, i) => ({
      x: (r() - 0.5) * 2,
      y: (r() - 0.5) * 2,
      z: -5 + r() * 7,
      size: 0.12 + r() * 0.22,
      speed: 0.15 + r() * 0.4,
      kind: i % 3,
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (reduceMotion) return;
    const t = state.clock.elapsedTime;
    items.forEach((it, i) => {
      const m = refs.current[i];
      const depth = (it.z + 5) / 7;
      m.rotation.x += delta * it.speed;
      m.rotation.y += delta * it.speed * 0.8;
      m.position.x = it.x * viewport.width * 0.55 + state.pointer.x * (0.15 + depth * 0.7);
      m.position.y = it.y * viewport.height * 0.5 + state.pointer.y * (0.1 + depth * 0.45) + Math.sin(t * it.speed * 2 + i) * 0.15;
    });
  });

  return items.map((it, i) => (
    <group
      key={i}
      ref={(el) => (refs.current[i] = el)}
      position={[it.x * viewport.width * 0.55, it.y * viewport.height * 0.5, it.z]}
      scale={it.size}
    >
      {it.kind === 2 ? (
        <lineSegments>
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial color="#2de300" transparent opacity={0.7} />
        </lineSegments>
      ) : (
        <mesh geometry={geometry}>
          <meshPhysicalMaterial
            color={it.kind ? "#eef0dc" : "#2de300"}
            metalness={it.kind ? 0.1 : 0.45}
            roughness={it.kind ? 0.5 : 0.25}
            clearcoat={0.6}
          />
        </mesh>
      )}
    </group>
  ));
}

export default function Scene({ active }) {
  const narrow = typeof window !== "undefined" && window.innerWidth <= 820;
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Studio />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={2} color="#eef0dc" />
      <PointerLight />
      <Logo3D />
      <Particles count={narrow ? 160 : 320} />
      <Floaters count={narrow ? 8 : 14} />
    </Canvas>
  );
}