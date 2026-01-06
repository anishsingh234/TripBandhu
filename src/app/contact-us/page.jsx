"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Headphones } from 'lucide-react';
import * as THREE from 'three';

export default function ContactUsPage() {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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
    camera.position.z = 50;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x9333ea,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const geometries = [
      new THREE.TorusGeometry(4, 1, 16, 100),
      new THREE.OctahedronGeometry(3),
      new THREE.TetrahedronGeometry(3)
    ];

    const material = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.6,
      wireframe: true
    });

    const shapes = geometries.map((geo, i) => {
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30
      );
      scene.add(mesh);
      return mesh;
    });

    // Lighting
    const light1 = new THREE.PointLight(0x9333ea, 1, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x3b82f6, 1, 100);
    light2.position.set(-10, -10, -10);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
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
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      // Animate shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.01 * (i + 1);
        shape.rotation.y += 0.01 * (i + 1);
        shape.position.y = Math.sin(Date.now() * 0.001 + i) * 3;
      });

      // Camera follows mouse
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Our team will respond within 24 hours",
      contact: "support@tripbandhu.com",
      action: "mailto:support@tripbandhu.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Available 24/7 for instant help",
      contact: "Start chatting now",
      action: "#"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      contact: "123 Travel Street, NY 10001",
      action: "#"
    }
  ];

  const departments = [
    {
      icon: <Headphones className="w-8 h-8" />,
      name: "Customer Support",
      email: "support@tripbandhu.com",
      description: "Get help with your account and trips"
    },
    {
      icon: <Users className="w-8 h-8" />,
      name: "Sales Team",
      email: "sales@tripbandhu.com",
      description: "Questions about pricing and plans"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      name: "Partnerships",
      email: "partners@tripbandhu.com",
      description: "Collaborate with Trip Bandhu"
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
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-600">
                {method.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <p className="text-purple-600 font-medium text-sm">{method.contact}</p>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-left">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Send us a Message</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you shortly.</p>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none bg-white/80"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Office Hours</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Departments</h3>
              <div className="space-y-5">
                {departments.map((dept, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-purple-50 transition-all">
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                      {dept.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{dept.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{dept.description}</p>
                      <a href={`mailto:${dept.email}`} className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        {dept.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Need Immediate Help?</h3>
              <p className="mb-6 text-purple-100">
                Check out our comprehensive help center with guides, tutorials, and FAQs.
              </p>
              <button className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Common Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                q: "How quickly will I get a response?",
                a: "We typically respond to all inquiries within 24 hours during business days."
              },
              {
                q: "Can I schedule a demo?",
                a: "Yes! Contact our sales team and they'll be happy to arrange a personalized demo."
              },
              {
                q: "Do you offer phone support?",
                a: "Phone support is available for Pro and Team plan subscribers during business hours."
              },
              {
                q: "Where is your office located?",
                a: "Our headquarters is in New York City, but we have a global remote team."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
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