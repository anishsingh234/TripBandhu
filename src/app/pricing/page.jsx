"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import * as THREE from 'three';

export default function PricingPage() {
  const canvasRef = useRef(null);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 60;

    // Create spiral particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 120;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x9333ea,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating rings
    const rings = [];
    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.TorusGeometry(8 + i * 3, 0.3, 16, 100);
      const ringMat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x7c3aed : 0x3b82f6,
        transparent: true,
        opacity: 0.4,
        wireframe: true
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = (Math.random() - 0.5) * 40;
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      scene.add(ring);
      rings.push(ring);
    }

    // Create diamond shapes
    const diamonds = [];
    for (let i = 0; i < 3; i++) {
      const diamondGeo = new THREE.OctahedronGeometry(4);
      const diamondMat = new THREE.MeshPhongMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.5,
        wireframe: true
      });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40
      );
      scene.add(diamond);
      diamonds.push(diamond);
    }

    // Lighting
    const light1 = new THREE.PointLight(0x9333ea, 2, 150);
    light1.position.set(30, 30, 30);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x3b82f6, 2, 150);
    light2.position.set(-30, -30, -30);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.03;

      // Animate rings
      rings.forEach((ring, i) => {
        ring.rotation.x += 0.005 * (i + 1);
        ring.rotation.y += 0.008 * (i + 1);
        ring.position.y = Math.sin(elapsedTime * 0.5 + i) * 5;
      });

      // Animate diamonds
      diamonds.forEach((diamond, i) => {
        diamond.rotation.x += 0.01;
        diamond.rotation.y += 0.015;
        diamond.position.y = Math.cos(elapsedTime * 0.8 + i * 2) * 8;
      });

      // Animate lights
      light1.position.x = Math.sin(elapsedTime * 0.5) * 40;
      light1.position.y = Math.cos(elapsedTime * 0.5) * 40;
      
      light2.position.x = Math.cos(elapsedTime * 0.3) * 40;
      light2.position.y = Math.sin(elapsedTime * 0.3) * 40;

      // Camera follows mouse
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 8 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const plans = [
    {
      name: "Free Explorer",
      description: "Perfect for casual travelers planning occasional trips",
      price: { monthly: 0, annual: 0 },
      features: [
        "3 trips per month",
        "Basic itinerary planning",
        "Hotel recommendations",
        "Flight search",
        "Email support",
        "Mobile app access"
      ],
      limitations: [
        "Advanced AI suggestions",
        "Priority support",
        "Custom travel guides",
        "Collaborative planning"
      ],
      highlighted: false,
      cta: "Start Free"
    },
    {
      name: "Travel Pro",
      description: "For frequent travelers who want premium features",
      price: { monthly: 19, annual: 190 },
      features: [
        "Unlimited trips",
        "Advanced AI itinerary",
        "Premium hotel deals",
        "Flight price alerts",
        "Priority 24/7 support",
        "Collaborative planning",
        "Custom travel guides",
        "Offline access",
        "Export to PDF",
        "Travel budget tracker"
      ],
      limitations: [],
      highlighted: true,
      cta: "Start Pro Trial"
    },
    {
      name: "Team Wanderer",
      description: "Ideal for travel agencies and group organizers",
      price: { monthly: 49, annual: 490 },
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Shared workspaces",
        "Client management",
        "White-label reports",
        "Advanced analytics",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Priority feature requests"
      ],
      limitations: [],
      highlighted: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Three.js Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #eff6ff 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Travel Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you're planning a weekend getaway or managing travel for your entire team, we have the perfect plan for you.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-purple-600' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-purple-600' : 'text-gray-500'}`}>
            Annual
          </span>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            Save 20%
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl scale-105 border-4 border-purple-400'
                  : 'bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg hover:shadow-2xl border border-gray-200 hover:-translate-y-2'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-purple-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-purple-200' : 'text-gray-500'}`}>
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {isAnnual && plan.price.annual > 0 && (
                  <p className={`text-sm mt-2 ${plan.highlighted ? 'text-purple-200' : 'text-gray-500'}`}>
                    ${(plan.price.annual / 12).toFixed(2)}/month billed annually
                  </p>
                )}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-8 ${
                  plan.highlighted
                    ? 'bg-white text-purple-600 hover:bg-gray-100 shadow-lg'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-4 text-left">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-green-300' : 'text-green-500'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-purple-50' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.limitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-start gap-3 opacity-60">
                    <X className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-purple-300' : 'text-gray-400'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-500'}`}>
                      {limitation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                q: "Is there a free trial?",
                a: "Yes! All paid plans come with a 14-day free trial. No credit card required."
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}