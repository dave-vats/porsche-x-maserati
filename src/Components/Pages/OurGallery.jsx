import React, { useEffect, useRef, useState } from "react";
import carImages from "../../GalleryPhotos";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EffectComposer, RenderPass, EffectPass, BloomEffect, NoiseEffect } from "postprocessing";


const sectionData = {
  astroText: {
    rotation: { from: [60, 80, -80], to: [80, 120, -80] },
    position: { from: [0, -0.5, 0], to: [0, -0.5, 0] },
  },
  galleryItem0: {
    rotation: { from: [80, 120, -80], to: [60, 160, -15] },
    position: { from: [0, -0.5, 0], to: [-0.6, -0.5, 0] },
  },
  galleryItem1: {
    rotation: { from: [60, 160, -15], to: [80, 160, 100] },
    position: { from: [-0.6, -0.5, 0], to: [0, -0.5, 0] },
  },
  galleryItem2: {
    rotation: { from: [80, 160, 100], to: [-50, 200, 200] },
    position: { from: [0, -0.5, 0], to: [0, -0.0, 0] },
  },
  galleryItem3: {
    rotation: { from: [-50, 200, 200], to: [-40, 180, 180] },
    position: { from: [0, -0.0, 0], to: [-0.7, -0.0, 0] },
  },
  galleryItem4: {
    rotation: { from: [-40, 180, 180], to: [90, 150, 340] },
    position: { from: [-0.7, -0.0, 0], to: [0, -3, 0] },
  },
};

const OurGallery = () => {
  let scene, astro, mixer, renderer, camera;
  const mainGalleryDiv = useRef(null);
  const refs = useRef(null)

  const { scrollYProgress } = useScroll({
    target: mainGalleryDiv,
    offset: ["start end", "end start"],
  });

  // console.log(scrollYProgress);
  

  const springScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 50 });

  const mapScrollToSection = (progress, section) => {
    const { rotation, position } = sectionData[section];

    const lerpAngle = (start, end, t) => {
      const delta = end > start ? end - start : -(start - end);
      return start + t * delta;
    };

    const lerp = (start, end, t) => start + t * (end - start);

    const t = Math.min(Math.max(progress, 0), 1);

    return {
      rotation: [
        lerpAngle(rotation.from[0], rotation.to[0], t),
        lerpAngle(rotation.from[1], rotation.to[1], t),
        lerpAngle(rotation.from[2], rotation.to[2], t),
      ],
      position: [
        lerp(position.from[0], position.to[0], t),
        lerp(position.from[1], position.to[1], t),
        lerp(position.from[2], position.to[2], t),
      ],
    };
  };

  useEffect(() => {
    scene = new THREE.Scene();
    const loader = new GLTFLoader();
  
    loader.load("./astro.glb", function (gltf) {
      astro = gltf.scene;
      scene.add(astro);
      mixer = new THREE.AnimationMixer(astro);
      mixer.clipAction(gltf.animations[0]).play();
    });
  
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("mainScene"),
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
  
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const innerWidth = window.innerWidth; 
    const innerHeight = window.innerHeight; 
    const scale = innerWidth > 1000 ? 6.5 : innerWidth > 600 ? 4 : innerWidth > 400 ? 3 : 2.5
    camera.position.z = ((innerHeight / innerWidth) * scale);
    
  
    // Postprocessing setup with `postprocessing` library
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
  
    // Bloom effect
    const bloomEffect = new BloomEffect({
      intensity: 4, // Bloom intensity
      luminanceThreshold: 0.275, // Brightness threshold for bloom
      luminanceSmoothing: 0.8, // Bloom transition smoothing
    });
  
    // Noise effect
    const noiseEffect = new NoiseEffect({
      premultiply: true, // Premultiplied alpha
      blendFunction: THREE.AdditiveBlending, // Blend mode
    });
    noiseEffect.blendMode.opacity.value = 1.3; // Adjust grain intensity
  
    // Combine bloom and noise effects
    const effectPass = new EffectPass(camera, bloomEffect, noiseEffect);
    composer.addPass(effectPass);
  
    // Create a clock to manage time delta
    const clock = new THREE.Clock();
  
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta(); // Get the time delta
  
      const progress = springScroll.get();
  
      const sections = Object.keys(sectionData);
      sections.forEach((section, i) => {
        const sectionStart = i / sections.length;
        const sectionEnd = (i + 1) / sections.length;
  
        if (progress >= sectionStart && progress < sectionEnd) {
          const sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart);
          const { rotation, position } = mapScrollToSection(sectionProgress, section);
  
          if (astro) {
            astro.rotation.set(
              THREE.MathUtils.degToRad(rotation[0]),
              THREE.MathUtils.degToRad(rotation[1]),
              THREE.MathUtils.degToRad(rotation[2])
            );
  
            astro.position.set(position[0], position[1], position[2]);
          }
        }
      });
  
      composer.render(delta); // Use delta for consistent rendering
      if (mixer) mixer.update(delta); // Update mixer with delta
    };
    animate();
  
    // Resize event listener to make the canvas responsive
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const zAmount = width > 1000 ? 6.5 : width > 600 ? 4 : width > 400 ? 3 : 2.5
  
      camera.position.z = ((height / width) * zAmount)
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
  
    window.addEventListener("resize", onResize);
  
    const footer = document.querySelector("footer");
    footer.style.position = "relative";
    footer.style.zIndex = 1;

    const onMouseMove = (event) => {
      const clientX = event.clientX;
      const clientY = event.clientY;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const xProgress = clientX / width;
      const yProgress = clientY / height;

      // Normalize the progress to be between 0 and 1
      const normalizedX = Math.max(0, Math.min(xProgress, 1));
      const normalizedY = Math.max(0, Math.min(yProgress, 1));

      // Use the normalized progress as needed
      // console.log(`x: ${normalizedX.toFixed(2)}, y: ${normalizedY.toFixed(2)}`);

      const cameraX = -(normalizedX * Math.PI / 2 ) * 0.06; // Adjust multiplier for desired effect
      const cameraY = (normalizedY * Math.PI / 2 ) * 0.05; // Adjust multiplier for desired effect and invert Y axis

      // Directly set the camera position
      camera.position.x = cameraX;
      camera.position.y = cameraY;
    };

    window.addEventListener("mousemove", onMouseMove);
    
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [springScroll]);

  return (
    <div ref={mainGalleryDiv} className="overflow-hidden bg-slate-900">
      <section className="h-dvh w-full font-dancingScript grid place-items-center">
        <h1 className="text-[rgba(255,255,255,.1)] leading-[1] text-[clamp(3.75rem,.7813rem_+_16.9643vw,15.625rem)] transition-all duration-300 ease-[.89,.12,.08,.74] tracking-normal hover:tracking-wide size-fit font-semibold">GALLERY</h1>
      </section>

      <div className="relative font-semibold flex text-[clamp(5.625rem,1.5625rem_+_23.2143vw,21.875rem)] justify-center items-center h-dvh w-full pointer-events-none select-none inset-0">
        <h1 className="font-dancingScript before:font-[50] after:font-[50] text-center text-[rgba(255,255,255,.1)] absolute before:absolute _700:before:top-0 before:-top-5 before:left-0 before:tracking-widest before:content-['Meet_our_Friend'] _510:before:text-2xl before:text-[18px] before:text-white after:absolute _700:after:bottom-0 after:-bottom-12 after:right-0 w-fit after:text-white _510:after:text-2xl after:text-[18px] after:content-['He’s_with_you_on_this_journey!'] after:tracking-widest" id="astroText">
          ASTRO
        </h1>
      </div>

      {[0, 1, 2, 3, 4].map((i) => {
        const first = carImages[2 * i];
        const second = carImages[2 * i + 1];
        const randomNo = Math.floor(Math.random() * 5 + 10);

        const { scrollYProgress } = useScroll({
          target: refs.current,
          offset: ['start end', 'end start']
        })
        const springScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 10 });

        const sm = useTransform(springScroll, [0, 1], [0, Math.floor((Math.random() * 150) + 75)])
        const lg = useTransform(springScroll, [0, 1], [0, Math.floor((Math.random() * -75) - 25)])
        const smallScale = useTransform(springScroll, [0, 1], [1, 1.2])
        const largeScale = useTransform(springScroll, [0, 1], [1, 1.6])
        

        return (
          <section
            ref={refs}
            key={i}
            id={`galleryItem${i}`}
            className={`_510:h-[150dvh] h-dvh pointer-events-none relative ${i === 4 ? 'border-b-2' : ''}`}
          >
            <motion.div
              className="absolute z-10 max-w-[400px] rounded-2xl overflow-hidden"
              style={{
                top: `${Math.random() * randomNo + 50}%`,
                left: `${Math.random() * 20 + 50}%`,
                x: lg,
                y: sm
              }}
            >
              <motion.img
              style={{ scale: largeScale }}
                className="w-full h-full object-cover object-center"
                src={first}
                alt="img"
              />
            </motion.div>
            <motion.div
              className="absolute max-w-[400px] max-h-[200px]"
              style={{
                top: `${Math.random() * + 50}%`,
                x: sm,
              }}
            >
              <motion.img
              style={{ scale: smallScale }}
                className="sm:w-full w-3/4 h-full rounded-2xl object-cover object-center"
                src={second}
                alt="img"
              />
            </motion.div>
          </section>
        );
      })}

      <canvas id="mainScene" className="fixed inset-0 pointer-events-none"></canvas>
      <section className="fixed bottom-0 z-[1] left-0 py-5 text-slate-400 flex items-end justify-between capitalize">
        <p className="font-mono"><span className="_510:block hidden">Lost in the</span> Cosmic Gallery</p>
        <p className="flex gap-2 items-end">
          <span>Scroll <span className="_510:block hidden">Down to begin.</span></span>
          <span className="h-10 relative w-2 block overflow-hidden">
            <motion.span
              initial={{ translateY: "-150%" }}
              animate={{ translateY: "100%" }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.5,
                ease: "backIn",
              }}
              className="absolute h-full inset-1/2 -translate-x-1/2 w-[.2rem] bg-slate-500 rounded-full shadow-inner"
            ></motion.span>
          </span>
        </p>
      </section>
    </div>
  );
};

export default OurGallery;