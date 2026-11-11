'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PhosphorIcons } from '@/components/icons';

type MuscleDef = {
  id: string;
  code: string;
  name: string;
  anatomicalName: string;
  targetAngle: number;
  anchor: { x: number; y: number; z: number };
  radius: { x: number; y: number; z: number };
  importance: string;
  guidance: string;
  maleNote: string;
  femaleNote: string;
};

// Anchor coordinates are in scene space: model stands from y=-0.82 (feet) to y=+1.48 (head top).
// +Z is the front of the body, +X is the model's left (screen right on FRONT view).
// targetAngle rotates the wrapper (around its own vertical center axis) to face the camera.
const MUSCLES: MuscleDef[] = [
  {
    id: 'neck_traps', code: '01', name: 'Neck & Upper Traps', anatomicalName: 'Sternocleidomastoid & Upper Trapezius',
    targetAngle: 0,
    anchor: { x: 0.05, y: 1.18, z: 0.05 }, radius: { x: 0.16, y: 0.11, z: 0.13 },
    importance: 'Controls head stability so you can scan the field fast before receiving the ball, keep your balance when changing direction, and win strong aerial headers.',
    guidance: 'Isometric neck holds, resistance-band posture work, and scanning drills under pressure so your head stays up during fast play.',
    maleNote: 'Bracing power for heavy aerial duels against physical center-backs.',
    femaleNote: 'Crucial neck and upper-back strength to absorb heading impact safely and lower concussion risk in girls\u2019 and women\u2019s football.',
  },
  {
    id: 'chest_delts', code: '02', name: 'Chest & Shoulders', anatomicalName: 'Pectoralis Major & Anterior/Lateral Deltoid',
    targetAngle: 0,
    anchor: { x: 0.13, y: 0.98, z: 0.13 }, radius: { x: 0.30, y: 0.17, z: 0.17 },
    importance: 'Your upper-body armor. You use your chest and shoulders to shield the ball, hold off defenders in 1v1 battles, and use your arms to sprint faster.',
    guidance: 'Explosive medicine-ball throws, push-up variations, and upper-body plyometrics to build fast, strong shielding power without adding slow, heavy bulk.',
    maleNote: 'Upper-body strength for shoulder-to-shoulder physical battles in U17\u2013U23 matches.',
    femaleNote: 'Frame stability so female players can protect the ball and ride tackles confidently.',
  },
  {
    id: 'core_obliques', code: '03', name: 'Core & Obliques', anatomicalName: 'Rectus Abdominis & External Obliques',
    targetAngle: 0,
    anchor: { x: 0.10, y: 0.62, z: 0.10 }, radius: { x: 0.20, y: 0.17, z: 0.15 },
    importance: 'The bridge between your legs and upper body. Every powerful shot, long diagonal pass, and sharp turn starts from a locked, stable core.',
    guidance: 'Rotational medicine-ball slams, anti-rotation planks, and dynamic stability drills\u2014zero useless floor sit-ups.',
    maleNote: 'Rotational torque for hardest shooting power and long-range passing.',
    femaleNote: 'Trunk and hip control to keep the body balanced during high-speed dribbling cuts.',
  },
  {
    id: 'hip_groin', code: '04', name: 'Hips & Groin', anatomicalName: 'Iliopsoas & Adductor Longus/Magnus',
    targetAngle: 0,
    anchor: { x: 0.09, y: 0.30, z: 0.07 }, radius: { x: 0.15, y: 0.15, z: 0.14 },
    importance: 'Powers whipped passes, shooting across your body, and quick sideways defensive shuffling. The groin is one of the most commonly injured areas in football if neglected.',
    guidance: 'Copenhagen adductor exercises, lateral plyometric bounds, and dynamic hip-opening routines before every pitch session to stop groin pulls before they happen.',
    maleNote: 'Protecting the groin against heavy shooting loads and sudden directional cuts.',
    femaleNote: 'Strengthening inner and outer hip muscles to support female hip alignment and protect the knees.',
  },
  {
    id: 'quads_knee', code: '05', name: 'Quads & Knee Joint', anatomicalName: 'Quadriceps Femoris & Patellar/ACL Complex',
    targetAngle: 0,
    anchor: { x: 0.12, y: 0.02, z: 0.12 }, radius: { x: 0.14, y: 0.22, z: 0.15 },
    importance: 'Your main engine for explosive 5-meter acceleration, jumping for headers, kicking power, and braking safely when pressing an opponent.',
    guidance: 'Explosive plyometrics (box jumps, single-leg bounds, and drop-landings), Bulgarian split squats, and deceleration mechanics so your knees stay rock-solid when stopping at top speed.',
    maleNote: 'Building maximum sprint acceleration and heavy braking power for 90-minute pro-league intensity.',
    femaleNote: 'Critical ACL Knee Protection. Female players have a much higher risk of knee ligament injuries; we train inner-quad (VMO) strength and soft plyometric landing mechanics every week.',
  },
  {
    id: 'lats_back', code: '06', name: 'Upper Back & Lats', anatomicalName: 'Latissimus Dorsi & Erector Spinae',
    targetAngle: Math.PI,
    anchor: { x: 0.14, y: 0.86, z: -0.13 }, radius: { x: 0.27, y: 0.21, z: 0.14 },
    importance: 'Drives a powerful arm swing when sprinting at top speed and keeps your spine protected when shielding the ball with your back to goal.',
    guidance: 'Pull-ups, inverted rows, and explosive overhead medicine-ball slams integrated into our weekly strength blocks.',
    maleNote: 'Building a strong back frame that defenders cannot push off the ball.',
    femaleNote: 'Postural stamina so sprint technique never breaks down in the last 20 minutes of a match.',
  },
  {
    id: 'glutes_pelvis', code: '07', name: 'Glutes & Pelvis', anatomicalName: 'Gluteus Maximus & Gluteus Medius',
    targetAngle: Math.PI,
    anchor: { x: 0.12, y: 0.32, z: -0.11 }, radius: { x: 0.21, y: 0.14, z: 0.15 },
    importance: 'The true powerhouse of a footballer. Strong glutes give you top-end sprint speed, explosive jumping height, and keep your knees aligned when landing.',
    guidance: 'Broad jumps, single-leg plyometric hops, hip thrusts, and resistance-band activation drills in every warm-up.',
    maleNote: 'Explosive forward push-off to beat defenders in the first three steps.',
    femaleNote: 'Glute activation keeps the thigh bone straight and prevents the knee from caving inward on jump landings.',
  },
  {
    id: 'hamstrings', code: '08', name: 'Hamstrings', anatomicalName: 'Biceps Femoris & Semitendinosus',
    targetAngle: Math.PI,
    anchor: { x: 0.12, y: -0.10, z: -0.11 }, radius: { x: 0.14, y: 0.21, z: 0.13 },
    importance: 'Controls your long sprinting stride at top speed and acts as the natural safety brake for your knee joint. Weak hamstrings lead to the most common sprinting tears in football.',
    guidance: 'Nordic hamstring lowers, single-leg deadlifts, sprint mechanics, and high-speed plyometric bounding\u2014proven in European football to cut hamstring tears by over 50%.',
    maleNote: 'Building long, strong hamstrings that can handle full-speed transition sprints without pulling.',
    femaleNote: 'Balancing quad-to-hamstring strength so the hamstrings actively protect the ACL during sudden stops.',
  },
  {
    id: 'calves_achilles', code: '09', name: 'Calves, Ankle & Achilles', anatomicalName: 'Gastrocnemius, Soleus & Achilles Tendon',
    targetAngle: Math.PI,
    anchor: { x: 0.09, y: -0.38, z: -0.08 }, radius: { x: 0.12, y: 0.17, z: 0.12 },
    importance: 'Works like a stiff spring every time your boot hits the grass\u2014giving you lightning-fast footwork, agility, and protection against rolled ankles.',
    guidance: 'Fast-contact plyometrics (pogo hops, hurdle hops, quick ladder bounces), single-leg calf raises, and barefoot balance work to bulletproof ankles on artificial turf (Kunstrasen).',
    maleNote: 'Tendon springiness for instant push-off and quick direction changes.',
    femaleNote: 'Ankle balance and ligament stability to prevent common ankle sprains during sharp cuts.',
  },
];

export function AnatomyLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const wrapperRef = useRef<any>(null);   // rotating group that holds the model, centered on the platform
  const highlightMatRef = useRef<any>(null);
  const uniformsRef = useRef<any>(null);
  const currentMuscleRef = useRef<MuscleDef | null>(null);
  const camThetaRef = useRef<number | null>(0); // target azimuth around the model: 0=front, PI/2=side, PI=back
  const loadedRef = useRef<any>(null);
  const loadingRef = useRef(false);

  const [threeModules, setThreeModules] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeMuscleId, setActiveMuscleId] = useState('quads_knee');
  const [activeView, setActiveView] = useState<'front' | 'side' | 'back'>('front');

  const activeMuscle = MUSCLES.find((m) => m.id === activeMuscleId) || null;

  // Load Three.js modules once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const THREE: any = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        if (!cancelled) setThreeModules({ THREE, GLTFLoader, DRACOLoader, OrbitControls });
      } catch (err) {
        console.error('Failed to load Three.js modules:', err);
        if (!cancelled) setLoadError('Three.js modules could not be loaded.');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Auto-load the male model
  useEffect(() => {
    if (!threeModules) return;
    loadModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threeModules]);

  function loadModel() {
    if (typeof window === 'undefined' || !threeModules) return;
    if (loadedRef.current || loadingRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    loadingRef.current = true;
    setIsLoading(true);
    setLoadProgress(0);
    setLoadError(null);

    try {
      const { THREE, GLTFLoader, DRACOLoader, OrbitControls } = threeModules;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050508);
      scene.fog = new THREE.Fog(0x050508, 4, 14);

      const aspect = container.clientWidth / container.clientHeight || 16 / 9;
      const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
      camera.position.set(0, 0.85, 4.9);
      camera.lookAt(0, 0.62, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.55);
      keyLight.position.set(3.0, 5.0, 3.0);
      keyLight.castShadow = true;
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0x00d4aa, 0.35);
      fillLight.position.set(-3.0, 1.5, 2.0);
      scene.add(fillLight);
      const rimLight = new THREE.DirectionalLight(0xe8c56d, 0.55);
      rimLight.position.set(0, 3.5, -3.5);
      scene.add(rimLight);
      const frontLight = new THREE.DirectionalLight(0xffffff, 0.45);
      frontLight.position.set(0, 1.2, 4.5);
      scene.add(frontLight);

      const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.98, 0.05, 64),
        new THREE.MeshStandardMaterial({ color: 0x0a0a12, roughness: 0.9, metalness: 0.1 })
      );
      platform.position.y = -0.9;
      platform.receiveShadow = true;
      scene.add(platform);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.88, 0.92, 64),
        new THREE.MeshBasicMaterial({ color: 0x00d4aa, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.875;
      scene.add(ring);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.5;
      controls.minDistance = 3.2;
      controls.maxDistance = 7.5;
      controls.minPolarAngle = Math.PI / 6;
      controls.maxPolarAngle = Math.PI / 2 + 0.15;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.autoRotate = false;
      controls.target.set(0, 0.62, 0);
      controls.addEventListener('start', () => { camThetaRef.current = null; }); // stop auto-orbiting once the user takes over

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;

      // Muscle-highlight material (single shared MeshStandardMaterial, patched shader)
      const uniforms = {
        uCenterA: { value: new THREE.Vector3(0.12, 0.02, 0.12) },
        uCenterB: { value: new THREE.Vector3(-0.12, 0.02, 0.12) },
        uTargetRadius: { value: new THREE.Vector3(0.14, 0.22, 0.15) },
        uHighlightColor: { value: new THREE.Color(0x00d4aa) },
        uHighlightIntensity: { value: 1.0 },
        uFrontSign: { value: 1.0 },
      };
      uniformsRef.current = uniforms;

      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xe6e6e1, roughness: 0.42, metalness: 0.06 });
      baseMaterial.onBeforeCompile = (shader: any) => {
        shader.uniforms.uCenterA = uniforms.uCenterA;
        shader.uniforms.uCenterB = uniforms.uCenterB;
        shader.uniforms.uTargetRadius = uniforms.uTargetRadius;
        shader.uniforms.uHighlightColor = uniforms.uHighlightColor;
        shader.uniforms.uHighlightIntensity = uniforms.uHighlightIntensity;
        shader.uniforms.uFrontSign = uniforms.uFrontSign;
        shader.vertexShader = 'varying vec3 vWorldPos;\n' + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;'
        );
        shader.fragmentShader = `
          uniform vec3 uCenterA;
          uniform vec3 uCenterB;
          uniform vec3 uTargetRadius;
          uniform vec3 uHighlightColor;
          uniform float uHighlightIntensity;
          uniform float uFrontSign;
          varying vec3 vWorldPos;
        ` + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `
          vec3 p = vWorldPos;
          vec3 dv = (p - uCenterA) / uTargetRadius;
          float distA = length(dv);
          vec3 dvB = (p - uCenterB) / uTargetRadius;
          float distB = length(dvB);
          float dist = min(distA, distB);
          // Only tint the half of the body the zone belongs to (no bleed-through to the far side)
          float sideMask = uFrontSign > 0.0 ? smoothstep(0.0, 0.05, p.z) : smoothstep(0.0, 0.05, -p.z);
          float zoneMask = (1.0 - smoothstep(0.7, 1.15, dist)) * sideMask;
          gl_FragColor.rgb = mix(gl_FragColor.rgb, uHighlightColor, zoneMask * 0.85 * uHighlightIntensity);
          #include <dithering_fragment>
          `
        );
      };
      highlightMatRef.current = baseMaterial;

      currentMuscleRef.current = MUSCLES.find((m) => m.id === activeMuscleId) || null;

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load(
        '/models/male_ecorche.glb',
        (gltf: any) => {
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          const center = new THREE.Vector3();
          box.getSize(size);
          box.getCenter(center);
          const targetHeight = 2.3;
          const scale = targetHeight / size.y;

          model.scale.setScalar(scale);
          // Offset the model INSIDE the wrapper so its visual center sits on the wrapper's Y axis.
          model.position.set(-center.x * scale, -0.82 - box.min.y * scale, -center.z * scale);
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.material = highlightMatRef.current;
            }
          });

          // Wrapper holds the model centered on the platform axis; the model itself never rotates.
          const wrapper = new THREE.Group();
          wrapper.add(model);
          scene.add(wrapper);

          wrapperRef.current = wrapper;
          loadedRef.current = wrapper;
          loadingRef.current = false;
          setIsLoading(false);
          setLoadProgress(100);
          setLoadError(null);

          startAnimation(THREE, scene, camera, renderer, controls);
        },
        (xhr: any) => { if (xhr.total > 0) setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100)); },
        (err: any) => {
          console.error(err);
          loadingRef.current = false;
          setLoadError('Failed to load 3D model.');
          setIsLoading(false);
        }
      );
    } catch (err) {
      console.error(err);
      loadingRef.current = false;
      setLoadError('Three.js modules could not be loaded.');
      setIsLoading(false);
    }
  }

  function startAnimation(THREE: any, scene: any, camera: any, renderer: any, controls: any) {
    let lastTime = performance.now();
    let breathPhase = 0;

    function animate(now: number) {
      const dt = document.hidden ? Math.min((now - lastTime) / 1000, 0.5) : Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      controls.update();

      const wrapper = wrapperRef.current;
      // Glide the camera around the model (azimuth interpolation, never over the top)
      const targetTheta = camThetaRef.current;
      if (targetTheta !== null && cameraRef.current && controlsRef.current) {
        const off = camera.position.clone().sub(controls.target);
        const r = off.length();
        if (r > 0.01) {
          const sph = new THREE.Spherical().setFromVector3(off);
          let delta = targetTheta - sph.theta;
          delta = ((delta + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
          const k = Math.min(1, dt * 4);
          sph.theta += delta * k;
          const targetPhi = Math.acos(0.23 / 4.9);
          sph.phi += (targetPhi - sph.phi) * k;
          sph.makeSafe();
          off.setFromSpherical(sph);
          camera.position.copy(controls.target).add(off);
        }
      }
      // Keep the renderer fitted to the container even if layout settles late
      const cont = containerRef.current;
      if (cont && rendererRef.current && cameraRef.current) {
        const cw = cont.clientWidth;
        const ch = cont.clientHeight;
        if (cw > 0 && ch > 0 && (rendererRef.current.domElement.clientWidth !== cw || rendererRef.current.domElement.clientHeight !== ch)) {
          camera.aspect = cw / ch;
          camera.updateProjectionMatrix();
          rendererRef.current.setSize(cw, ch);
        }
      }
      if (wrapper) {
        // Idle breathing / float (model stays standing in one spot)
        breathPhase += dt * 0.6;
        wrapper.position.y = Math.sin(breathPhase) * 0.012;

        // Keep highlight ellipsoids locked to the model as it rotates
        const m = currentMuscleRef.current;
        const u = uniformsRef.current;
        if (m && u) {
          const cos = Math.cos(wrapper.rotation.y);
          const sin = Math.sin(wrapper.rotation.y);
          const ax = m.anchor.x;
          const az = m.anchor.z;
          u.uCenterA.value.set(ax * cos + az * sin, m.anchor.y, -ax * sin + az * cos);
          u.uCenterB.value.set(-ax * cos + az * sin, m.anchor.y, ax * sin + az * cos);
          u.uTargetRadius.value.set(m.radius.x, m.radius.y, m.radius.z);
          u.uFrontSign.value = m.anchor.z >= 0 ? 1 : -1;
        }
      }

      renderer.render(scene, camera);
    }

    // rAF loop with a setTimeout fallback so the scene still renders in throttled/background tabs
    let scheduled = false;
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      let done = false;
      const run = (t: number) => {
        if (done) return;
        done = true;
        scheduled = false;
        animate(t || performance.now());
        schedule();
      };
      requestAnimationFrame(run);
      setTimeout(run, 250);
    }
    schedule();

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);
  }

  function setView(view: 'front' | 'side' | 'back') {
    camThetaRef.current = view === 'front' ? 0 : view === 'side' ? Math.PI / 2 : Math.PI;
    setActiveView(view);
  }

  function selectMuscle(id: string) {
    setActiveMuscleId(id);
    const muscle = MUSCLES.find((m) => m.id === id);
    if (muscle) {
      currentMuscleRef.current = muscle;
      // Camera orbits to whichever side of the body the muscle lives on
      const front = muscle.anchor.z >= 0;
      camThetaRef.current = front ? 0 : Math.PI;
      setActiveView(front ? 'front' : 'back');
    }
  }

  if (loadError) {
    return (
      <section className="py-20 md:py-32 bg-[#050508]">
        <div className="container-main text-center">
          <div className="eyebrow eyebrow-accent mb-6">3D Athlete Biomechanics Lab</div>
          <h2 className="text-section font-display font-bold text-foreground uppercase mb-8">3D Athlete Lab</h2>
          <div className="card-double max-w-lg mx-auto">
            <div className="card-inner text-center py-12">
              <PhosphorIcons.X className="h-10 w-10 text-red-500 mx-auto mb-4" strokeWidth={2} />
              <h3 className="font-display font-semibold text-foreground mb-2">Model Unavailable</h3>
              <p className="text-foreground-muted">{loadError}</p>
              <button onClick={() => { setLoadError(null); loadModel(); }} className="btn-primary mt-6">Try Again</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-0 bg-[#050508] relative overflow-hidden min-h-[750px]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,212,170,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2000px] h-[2000px] rounded-full border border-white/[0.04] -translate-y-[1000px]" />
      </div>

      <div className="container-main relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 bg-accent/10 border border-accent/20 text-accent text-micro font-medium tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Pro Sports Science Lab
          </div>
          <h2 className="text-section font-display font-bold tracking-tight text-foreground uppercase mb-6">
            Train the <span className="text-gradient-accent">Body</span>, Not Just the Ball
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            Interactive 3D athlete anatomy showing the muscle groups we target for injury prevention, speed, and power. Drag to rotate, scroll to zoom, and click a muscle to highlight it.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <motion.div className="col-span-12 lg:col-span-8 relative rounded-2xl overflow-hidden border border-border/40 bg-black/30 shadow-2xl group min-h-[750px] flex flex-col" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}>
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur"><PhosphorIcons.UsersThree className="h-4 w-4 text-gold" strokeWidth={2} /><span className="text-micro text-foreground font-medium">Male Athlete &mdash; Anatomy Reference</span></div>
            </div>
            <div ref={containerRef} className="flex-1 w-full h-full" />
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-30">
                <div className="text-center">
                  <div className="relative h-16 w-16 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-accent font-display font-bold text-xl">{loadProgress}%</span></div>
                  </div>
                  <p className="text-micro text-foreground-muted uppercase tracking-wider">Loading Athlete Model</p>
                </div>
              </div>
            )}
            {!isLoading && !loadError && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-5 left-5 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur"><PhosphorIcons.SoccerBall className="h-4 w-4 text-accent" strokeWidth={2} /><span className="text-micro text-foreground font-medium">3D Model Active</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-5 right-5 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur"><PhosphorIcons.Check className="h-4 w-4 text-accent" strokeWidth={2} /><span className="text-micro text-foreground font-medium">Drag to Rotate</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 rounded-full bg-black/60 border border-white/10 backdrop-blur px-1.5 py-1.5">
                  <span className="px-2.5 text-micro uppercase tracking-wider text-foreground-subtle">View</span>
                  <button onClick={() => setView('front')} className={activeView === 'front' ? 'px-4 py-1.5 rounded-full text-xs font-medium transition-all bg-white/15 text-foreground' : 'px-4 py-1.5 rounded-full text-xs font-medium transition-all text-foreground-muted hover:text-foreground'}>FRONT</button>
                  <button onClick={() => setView('side')} className={activeView === 'side' ? 'px-4 py-1.5 rounded-full text-xs font-medium transition-all bg-white/15 text-foreground' : 'px-4 py-1.5 rounded-full text-xs font-medium transition-all text-foreground-muted hover:text-foreground'}>SIDE</button>
                  <button onClick={() => setView('back')} className={activeView === 'back' ? 'px-4 py-1.5 rounded-full text-xs font-medium transition-all bg-white/15 text-foreground' : 'px-4 py-1.5 rounded-full text-xs font-medium transition-all text-foreground-muted hover:text-foreground'}>BACK</button>
                </motion.div>
              </>
            )}
          </motion.div>

          <motion.div className="col-span-12 lg:col-span-4 space-y-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}>
            <div className="rounded-xl border border-border/40 bg-black/40 p-5 shadow-lg">
              <div className="text-micro text-foreground-muted uppercase tracking-wider font-medium mb-2">Reference Model</div>
              <div className="flex items-center gap-2 mb-3"><PhosphorIcons.UsersThree className="h-5 w-5 text-gold" strokeWidth={2} /><span className="text-sm font-display font-semibold text-foreground">Male Athlete Ecorche</span></div>
              <p className="text-xs text-foreground-muted leading-relaxed">Drag to rotate &middot; scroll to zoom &middot; pick a muscle group to light it up on the body.</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-black/40 p-5 shadow-lg">
              <div className="text-micro text-foreground-muted uppercase tracking-wider font-medium mb-4">Muscle Groups</div>
              <div className="space-y-2">
                {MUSCLES.map((m) => {
                  const active = activeMuscleId === m.id;
                  return (
                    <button key={m.id} onClick={() => selectMuscle(m.id)} className={active ? 'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all bg-accent/10 border border-accent text-accent shadow-[0_0_8px_rgba(0,212,170,0.25)]' : 'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all text-foreground-muted hover:text-foreground hover:bg-white/5 border border-transparent'}>
                      <span className="flex items-center gap-2"><span className={active ? 'text-micro font-bold text-accent' : 'text-micro font-bold text-foreground-muted'}>{m.code}</span><span className="text-sm font-medium">{m.name}</span></span>
                      <PhosphorIcons.ArrowRight className={active ? 'h-3 w-3 text-accent' : 'h-3 w-3 text-foreground-muted'} strokeWidth={2} />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {activeMuscle && (
          <motion.div key={activeMuscleId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-16 grid md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -4, transition: { duration: 0.25 } }} className="rounded-xl border border-border/40 bg-black/30 p-6 backdrop-blur-sm group">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300"><span className="text-accent font-display font-bold text-lg">{activeMuscle.code}</span></div>
                <div><h4 className="font-display font-semibold text-foreground mb-1">{activeMuscle.name}</h4><p className="text-micro text-accent font-medium">{activeMuscle.anatomicalName}</p></div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed"><span className="text-foreground font-semibold">Why It Matters &mdash; </span>{activeMuscle.importance}</p>
            </motion.div>
            <motion.div whileHover={{ y: -4, transition: { duration: 0.25 } }} className="rounded-xl border border-border/40 bg-black/30 p-6 backdrop-blur-sm group">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300"><PhosphorIcons.Target className="h-5 w-5 text-gold" strokeWidth={2} /></div>
                <div><h4 className="font-display font-semibold text-foreground mb-1">Coach Zain's Training</h4><p className="text-micro text-gold font-medium">How We Train It &mdash; Strength &amp; Physio</p></div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">{activeMuscle.guidance}</p>
            </motion.div>
            <motion.div whileHover={{ y: -4, transition: { duration: 0.25 } }} className="rounded-xl border border-border/40 bg-black/30 p-6 backdrop-blur-sm group">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300"><PhosphorIcons.ShieldCheck className="h-5 w-5 text-accent" strokeWidth={2} /></div>
                <div><h4 className="font-display font-semibold text-foreground mb-1">Squad-Specific Notes</h4><p className="text-micro text-accent font-medium">Same Model, Different Needs</p></div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><span className="text-gold font-semibold">Male Squad &mdash; </span>{activeMuscle.maleNote}</p>
              <p className="text-sm text-foreground-muted leading-relaxed"><span className="text-accent font-semibold">Female Squad &mdash; </span>{activeMuscle.femaleNote}</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
