import { EffectComposer, RenderPass, EffectPass, BloomEffect, SMAAEffect } from "postprocessing";
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { motion, useMotionValue, animate, useSpring } from 'framer-motion';
import aerythAssets from '../../aerythContent';
import { ChargingStation, Disc, Robot, SteeringWheel, UserCirclePlus, Wind } from "@phosphor-icons/react";

const Aeryth = () => {
    let scene, loader, camera, renderer, aeryth, ambientLight, topLight, canvas, composer, mixer;
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const animationValues = [
        {
            id: 'section-initial',
            position: { x: 0, y: -1.5, z: 0 },
            rotation: { x: 40, y: 0, z: 0 }
        },
        {
            id: 'section-start',
            position: { x: 0, y: -1.5, z: 0 },
            rotation: { x: 5, y: 50, z: 0 }
        },
        {
            id: 'section-one',
            position: { x: 2.5, y: -1.2, z: 0 },
            rotation: { x: 5, y: -50, z: 0 }
        },
        {
            id: 'section-two',
            position: { x: -2, y: -1.2, z: 0 },
            rotation: { x: 20, y: -50, z: 0 }
        },
        {
            id: 'section-three',
            position: { x: 0, y: -0.3, z: -2 },
            rotation: { x: 80, y: 0, z: 0 }
        },
        {
            id: 'section-four',
            position: { x: 0, y: -1, z: -2 },
            rotation: { x: 20, y: 180, z: 0 }
        },
        {
            id: 'footer-div',
            position: { x: 0, y: 10, z: -2 },
            rotation: { x: 60, y: 180, z: 0 }
        }
    ];

    const [counter, setCounter] = useState(0);
    const [isCarAnimationDone, setIsCarAnimationDone] = useState(false);

    const pageContent = aerythAssets[3];

    const carAnimationDelay = 4;
    const carNameAnimationDelay = carAnimationDelay / 2;
    const carFullFormAnimationDelay = carNameAnimationDelay + 0.5;
    const featureAnimationDelay = carFullFormAnimationDelay + 0.5;

    const positionX = useSpring(0, { damping: 40, ease: [0.25, 0.46, 0.45, 0.94] });
    const positionY = useSpring(-1.5, { damping: 40, ease: [0.25, 0.46, 0.45, 0.94] });
    const positionZ = useSpring(0, { damping: 40, ease: [0.25, 0.46, 0.45, 0.94] });

    const rotationX = useSpring(5, { damping: 40, ease: [0.25, 0.46, 0.45, 0.94] });
    const rotationY = useSpring(50, { damping: 40, ease: [0.25, 0.46, 0.45, 0.94] });
    const rotationZ = useSpring(0, { damping: 40, ease: [0.25, 0.46, 0.45, 0.94] });

    const fullForm = aerythAssets[1].fullForm;

    const carDetails = [
        { value: '320 km/h' },
        { value: '0-100 3.2s' },
        { value: '750 hp' }
    ];

    useEffect(() => {
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const scale = window.innerWidth > 1000 ? 11.5 : window.innerWidth > 950 ? 8 : window.innerWidth > 600 ? 8 : window.innerWidth > 400 ? 6 : 6;
        camera.position.z = (window.innerHeight / window.innerWidth) * scale;

        scene = new THREE.Scene();

        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(
            'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_04_1k.hdr',
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;
            },
            undefined,
            (error) => console.error('Error loading HDRI:', error)
        );

        loader = new GLTFLoader();
        loader.load(
            './door.glb',
            (gltf) => {
                aeryth = gltf.scene;
                scene.add(aeryth);

                aeryth.scale.set(1, 1, 1);
                animateModel();

                mixer = new THREE.AnimationMixer(aeryth);
                mixer.clipAction(gltf.animations[0]).play();

                aeryth.children.forEach(child => {
                    if (child.isMesh) {
                        child.material.envMap = scene.environment;
                        child.material.envMapIntensity = 1;
                        child.material.needsUpdate = true;
                        child.material.metalness = 0.5;
                        child.material.roughness = 0.1;
                    }
                });
            },
            undefined,
            (error) => console.error('Error loading model:', error)
        );

        const animateModel = () => {
            if (aeryth) {
                aeryth.position.x = positionX.get();
                aeryth.position.y = positionY.get();
                aeryth.position.z = positionZ.get();
                aeryth.rotation.x = THREE.MathUtils.degToRad(rotationX.get());
                aeryth.rotation.y = THREE.MathUtils.degToRad(rotationY.get());
                aeryth.rotation.z = THREE.MathUtils.degToRad(rotationZ.get());
            }
            requestAnimationFrame(animateModel);
        };

        canvas = document.getElementById('carModelCanvas');
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        topLight = new THREE.DirectionalLight(0xdddddd, 1);
        topLight.position.set(500, 500, 500);
        scene.add(topLight);

        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomEffect = new BloomEffect({ intensity: 0.01, threshold: 0, radius: 0.1 });
        const effectPass = new EffectPass(camera, bloomEffect);
        composer.addPass(effectPass);

        const smaaEffect = new SMAAEffect();
        const smaaEffectPass = new EffectPass(camera, smaaEffect);
        composer.addPass(smaaEffectPass);

        const reRender3D = () => {
            requestAnimationFrame(reRender3D);
            composer.render();

            if (mixer) {
                mixer.update(0);
            }
        };
        reRender3D();

        const handleScroll = () => {
            const validSections = document.querySelectorAll('section.ValidSection');
            let currentSection;
            validSections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 3) {
                    currentSection = section.id;
                }
            });

            if (currentSection) {
                let position_active = animationValues.findIndex(
                    (value) => value.id === currentSection
                );

                if (position_active >= 0) {
                    let newCordinates = animationValues[position_active];
                    positionX.set(newCordinates.position.x);
                    positionY.set(newCordinates.position.y);
                    positionZ.set(newCordinates.position.z);
                    rotationX.set(newCordinates.rotation.x);
                    rotationY.set(newCordinates.rotation.y);
                    rotationZ.set(newCordinates.rotation.z);
                }

                positionX.on("change", animateModel);
                positionY.on("change", animateModel);
                positionZ.on("change", animateModel);
                rotationX.on("change", animateModel);
                rotationY.on("change", animateModel);
                rotationZ.on("change", animateModel);
            }
        };

        window.addEventListener('scroll', handleScroll);

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const zAmount = width > 1000 ? 11.5 : width > 950 ? 8 : width > 600 ? 8 : width > 400 ? 6 : 6;
            camera.position.z = (height / width) * zAmount;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        animate(rotationY, 50, { delay: carAnimationDelay, duration: 2, ease: 'anticipate' });
        animate(rotationX, 5, { delay: carAnimationDelay, duration: 2, ease: 'anticipate' });

        const footer = document.querySelector('footer');
        footer.style.position = 'relative';
        footer.style.zIndex = '10';

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [positionY, rotationY, rotationX]);

    return (
        <>
            <motion.div className='fixed pointer-events-none z-[999] h-dvh w-full'
                initial={{ translateY: '100%' }}
                animate={{ translateY: '0%' }}
                transition={{ delay: carAnimationDelay - 1, duration: 2, ease: 'anticipate' }}
            >
                <canvas className='size-full' id='carModelCanvas'></canvas>
            </motion.div>

            <motion.section className="fixed z-[998] bottom-0 left-0 pb-4 text-white" id="section-initial"
                initial={{ translateY: '100%' }}
                animate={{ translateY: '0%' }}
                transition={{ delay: carAnimationDelay - 2, duration: 2, ease: 'anticipate' }}
            >
                <div className='flex w-full py-3 bg-[rgba(0,0,0,0.5)] text-base text-slate-400 rounded-xl px-5 justify-between items-center'>
                    <div>
                        <p>Aeryth</p>
                    </div>
                    <div>
                        <p className="flex gap-2 items-center">
                            <span>Scroll <span className="_510:block hidden">Down to begin.</span></span>
                            <span className="h-8 relative w-2 block overflow-hidden">
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
                    </div>
                </div>
            </motion.section>

            <section className='fixed inset-0 h-dvh w-full pointer-events-none -z-[1] bg-[radial-gradient(circle,rgba(61,61,80,1)_0%,_rgba(28,28,45,1)_100%)]'></section>

            <section id='section-start' className='ValidSection h-dvh relative' >
                <motion.h1 className='text-[clamp(6.25rem,5.1563rem_+_6.25vw,10.625rem)] select-none leading-[1.3] text-[#acacac] font-dancingScript text-center absolute w-full left-0 top-16'
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: '0%' }}
                    transition={{ delay: carNameAnimationDelay, duration: 1, ease: 'anticipate' }}
                >
                    Aeryth
                </motion.h1>

                <div className='size-full flex lg:flex-row flex-col lg:lg:justify-gap lg:between justify-end'>
                    <div className='h-full w-full lg:flex lg:flex-col hidden justify-center'>
                        <div className='fullFormParent flex w-fit lg:flex-col justify-center'>
                            {fullForm.map((e, i) => (
                                <motion.span
                                    initial={{ filter: 'blur(10px)', opacity: 0, pointerEvents: 'none' }}
                                    animate={{ filter: 'blur(0px)', opacity: 1, pointerEvents: 'auto' }}
                                    transition={{ delay: carFullFormAnimationDelay + (i * 0.05), duration: 1, ease: "anticipate", when: "beforeChildren", staggerChildren: 0.5 }}
                                    key={i}
                                    className='flex items-center capitalize font-aquire transition-all duration-300 ease-in text-[#c7c7c7] fullForm cursor-pointer'
                                >
                                    <span className='initialWord pe-8'>
                                        <span className='size-10 grid place-items-center bg-[#7e7d7d] rounded-[50%]'>{e.word}</span>
                                    </span>
                                    <span className='tracking-[5px] py-4 blur-sm meaning'>{e.meaning}</span>
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className='lg:grid place-content-center flex justify-between lg:pb-0 pb-24'>
                        {carDetails.map((e, i) => {
                            const [start, setStart] = useState(0);
                            const [end, setEnd] = useState(() => Math.random() * (99 - 75) + 75);
                            return (
                                <motion.div
                                    key={i}
                                    className='relative size-[120px] transition-all duration-500 cursor-pointer group'
                                    onMouseEnter={() => setStart(end)}
                                    onMouseLeave={() => setStart(0)}

                                    initial={{
                                        translateX: '150%',
                                        opacity: 0,
                                        pointerEvents: 'none'
                                    }}
                                    animate={{
                                        translateX: '0%',
                                        opacity: 1,
                                        pointerEvents: 'auto'
                                    }}
                                    transition={{
                                        delay: featureAnimationDelay + (i * 0.05),
                                        duration: 1,
                                        ease: "anticipate"
                                    }}
                                >
                                    <svg
                                        className='absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 size-[75%] -rotate-90'
                                        viewBox='0 0 150 150'
                                    >
                                        <circle
                                            cx='75'
                                            cy='75'
                                            r='65'
                                            className='fill-none transition-all ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] duration-500 stroke-[rgba(255,255,255,0.1)] group-hover:stroke-[10] stroke-[5]'
                                        />
                                        <circle
                                            cx='75'
                                            cy='75'
                                            r='65'
                                            className='fill-none transition-all ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] duration-1000 stroke-[rgba(255,255,255,0.5)] group-hover:stroke-[10] stroke-[5]'
                                            strokeDasharray={`${2 * Math.PI * 65}`}
                                            style={{
                                                strokeDashoffset: `${2 * Math.PI * 65 * (1 - start / 100)}`
                                            }}
                                        />
                                    </svg>
                                    <div className='absolute inset-0 flex flex-col items-center size-full justify-center text-[#999] group-hover:scale-90 duration-300 border-e-transparent transition-transform'>
                                        <h3 className='text-[20px] font-medium'>{e.value.split(' ')[0]}</h3>
                                        <span className='text-sm'>{e.value.split(' ').pop()}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="section-one" className="ValidSection h-auto lg:h-dvh flex flex-col justify-between lg:py-20 md:py-16 py-10 text-[rgba(255,255,255,.75)]">
                <div className="flex lg:flex-row flex-col lg:justify-between gap-y-12 lg:gap-y-0 lg:items-center lg:leading-[1]">
                    <div>
                        <h1 className='text-[clamp(2.375rem,1.4063rem_+_5.5357vw,6.25rem)] font-medium'>AeroDynamic</h1>
                        <h1 className='text-[clamp(2.375rem,1.4063rem_+_5.5357vw,6.25rem)] font-medium'>Design</h1>
                    </div>
                    <div>
                        <p className="max-w-[500px] text-white flex lg:justify-end flex-wrap gap-x-3 gap-y-2 text-[clamp(0.875rem,0.8125rem_+_0.3571vw,1.125rem)]">{
                            pageContent.aerodynamicTextTwo.split(' ').map((e, i) => {
                                return (
                                    <span key={i} className="relative">
                                        <span className="opacity-20">{e}</span>
                                        <span className="absolute inset-0 opacity-20">{e}</span>
                                    </span>
                                )
                            })
                        }</p>
                    </div>
                </div>
                <p className="max-w-[500px] text-white flex flex-wrap gap-x-3 lg:mt-0 mt-10 gap-y-2 text-[clamp(0.875rem,0.8125rem_+_0.3571vw,1.125rem)]">
                    {
                        pageContent.aerodynamicDesign.split(' ').map((e, i) => {
                            return (
                                <span key={i} className="relative">
                                    <span className="opacity-20">{e}</span>
                                    <span className="absolute inset-0 opacity-20">{e}</span>
                                </span>
                            )
                        })
                    }
                </p>
                <div className="flex items-end lg:max-w-[48%] gap-4 lg:pb-4 lg:mt-0 mt-10 w-full">
                    <div className="flex-1 h-full bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
                        <img className="size-full invert mix-blend-screen opacity-70 object-contain object-center" src={aerythAssets[2].imageOne} alt="Aeryth" />
                    </div>
                    <div className="flex-1 h-full bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
                        <img className="size-full invert mix-blend-screen opacity-70 object-contain object-center" src={aerythAssets[2].imageTwo} alt="Aeryth" />
                    </div>
                </div>
            </section>

            <section id="section-two" className="ValidSection h-auto lg:h-dvh flex flex-col items-end justify-between lg:py-20 md:py-16 py-10 text-[rgba(255,255,255,.75)]">
                <div className="flex lg:flex-row flex-col lg:justify-between gap-y-12 lg:gap-y-0 lg:items-center w-full items-center leading-[1]">
                    <div>
                        <p className="lg:max-w-[600px] lg:order-1 order-2 text-white flex flex-wrap gap-x-3 gap-y-2 text-[clamp(0.875rem,0.8125rem_+_0.3571vw,1.125rem)]">{
                            pageContent.performanceText.split(' ').map((e, i) => {
                                return (
                                    <span key={i} className="relative">
                                        <span className="opacity-20">{e}</span>
                                        <span className="absolute inset-0 opacity-20">{e}</span>
                                    </span>
                                )
                            })
                        }</p>
                    </div>
                    <div className="text-end lg:order-2 order-1">
                        <h1 className='text-[clamp(2.375rem,1.4063rem_+_5.5357vw,6.25rem)] font-medium'>Performance</h1>
                        <h1 className='text-[clamp(2.375rem,1.4063rem_+_5.5357vw,6.25rem)] font-medium'>& Speed</h1>
                    </div>
                </div>
                <p className="lg:max-w-[600px] lg:my-0 my-16 text-white flex justify-end flex-wrap gap-x-3 gap-y-2 text-[clamp(0.875rem,0.8125rem_+_0.3571vw,1.125rem)]">
                    {
                        pageContent.speedText.split(' ').map((e, i) => {
                            return (
                                <span key={i} className="relative">
                                    <span className="opacity-20">{e}</span>
                                    <span className="absolute inset-0 opacity-20">{e}</span>
                                </span>
                            )
                        })
                    }
                </p>
                <div className="flex justify-end items-end lg:max-w-[48%] gap-4 pb-4 w-full">
                    <div className="flex-1 sm:max-w-[60%] lg:max-w-[60%] w-full full lg:max-h-[90%] bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden">
                        <img className="size-full object-contain brightness-[.8] object-center" src={aerythAssets[2].performance} alt="Aeryth" />
                    </div>
                </div>
            </section>

            <section id="section-three" className="ValidSection h-dvh lg:py-20 md:py-16 py-10 text-white">
                <div className="featureParent size-full flex justify-between">
                    <div className="grid place-items-center flex-1 rounded-lg overflow-hidden">
                        <div className="relative bg-[rgba(0,0,0,.3)] select-none justify-self-end group grid place-items-center transition-all duration-300 ease-[cubic-bezier(.52,-0.01,.44,1.22)] hover:size-20 lg:hover:size-32 size-16 cursor-pointer rounded-[50%] overflow-hidden">
                            <div className="group-hover:-translate-y-3/4 transition-all duration-500">
                                <ChargingStation size={24} />
                            </div>
                            <div className="top-1/2 left-1/2 -translate-x-1/2 absolute overflow-hidden">
                                <h3 className="lg:font-medium md:text-base text-xs transition-all duration-300 ease-in-out tracking-[1px] translate-y-full group-hover:translate-y-0 text-center">Hybrid</h3>
                            </div>
                        </div>

                        <div className="relative justify-self-start bg-[rgba(0,0,0,.3)] select-none group grid place-items-center transition-all duration-300 ease-[cubic-bezier(.52,-0.01,.44,1.22)] hover:size-20 lg:hover:size-32 size-16 cursor-pointer rounded-[50%] overflow-hidden">
                            <div className="group-hover:-translate-y-3/4 transition-all duration-500">
                                <Wind size={24} />
                            </div>
                            <div className="top-1/2 left-1/2 -translate-x-1/2 absolute overflow-hidden">
                                <h3 className="lg:font-medium md:text-base text-xs transition-all duration-300 ease-in-out tracking-[1px] leading-[1.1] translate-y-full group-hover:translate-y-0 text-center">Smart<br />Aero</h3>
                            </div>
                        </div>

                        <div className="relative bg-[rgba(0,0,0,.3)] select-none justify-self-end group grid place-items-center transition-all duration-300 ease-[cubic-bezier(.52,-0.01,.44,1.22)] hover:size-20 lg:hover:size-32 size-16 cursor-pointer rounded-[50%] overflow-hidden">
                            <div className="group-hover:-translate-y-3/4 transition-all duration-500">
                                <SteeringWheel size={24} />
                            </div>
                            <div className="top-1/2 left-1/2 -translate-x-1/2 absolute overflow-hidden">
                                <h3 className="lg:font-medium md:text-base text-xs transition-all duration-300 ease-in-out tracking-[1px] leading-[1.1] translate-y-full group-hover:translate-y-0 text-center">Auto<br />Drive</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1"></div>

                    <div className="grid place-items-center flex-1 rounded-lg overflow-hidden">
                        <div className="relative justify-self-start bg-[rgba(0,0,0,.3)] select-none group grid place-items-center transition-all duration-300 ease-[cubic-bezier(.52,-0.01,.44,1.22)] hover:size-20 lg:hover:size-32 size-16 cursor-pointer rounded-[50%] overflow-hidden">
                            <div className="group-hover:-translate-y-3/4 transition-all duration-500">
                                <UserCirclePlus size={24} />
                            </div>
                            <div className="top-1/2 left-1/2 -translate-x-1/2 absolute overflow-hidden">
                                <h3 className="lg:font-medium md:text-base text-xs transition-all duration-300 ease-in-out tracking-[1px] translate-y-full group-hover:translate-y-0 leading-[1] text-center">Active<br />Safety</h3>
                            </div>
                        </div>

                        <div className="relative justify-self-end bg-[rgba(0,0,0,.3)] select-none group grid place-items-center transition-all duration-300 ease-[cubic-bezier(.52,-0.01,.44,1.22)] hover:size-20 lg:hover:size-32 size-16 cursor-pointer rounded-[50%] overflow-hidden">
                            <div className="group-hover:-translate-y-3/4 transition-all duration-500">
                                <Disc size={24} />
                            </div>
                            <div className="top-1/2 left-1/2 -translate-x-1/2 absolute overflow-hidden">
                                <h3 className="lg:font-medium md:text-base text-xs transition-all duration-300 ease-in-out tracking-[1px] leading-[1.1] translate-y-full group-hover:translate-y-0 text-center">Generative<br />Brakes</h3>
                            </div>
                        </div>

                        <div className="relative justify-self-start bg-[rgba(0,0,0,.3)] select-none group grid place-items-center transition-all duration-300 ease-[cubic-bezier(.52,-0.01,.44,1.22)] hover:size-20 lg:hover:size-32 size-16 cursor-pointer rounded-[50%] overflow-hidden">
                            <div className="group-hover:-translate-y-3/4 transition-all duration-500">
                                <Robot size={24} />
                            </div>
                            <div className="top-1/2 left-1/2 -translate-x-1/2 absolute overflow-hidden">
                                <h3 className="lg:font-medium md:text-base text-xs transition-all duration-300 ease-in-out tracking-[1px] leading-[1.1] translate-y-full group-hover:translate-y-0 text-center">Intelligent<br />AI System</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section-four" className="ValidSection h-[50dvh]">
            </section>

            <section id="footer-div" className="ValidSection h-[50dvh]"></section>
        </>
    );
};

export default Aeryth;
