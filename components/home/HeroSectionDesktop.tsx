import React, { useState, useEffect, useRef } from 'react';
import { Star, Sparkles } from 'lucide-react';
import './hero.css';

const HeroSectionDesktop: React.FC = () => {
  const [activeMovie, setActiveMovie] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const movies = [
    {
      id: 2,
      title: "Interstellar",
      year: 2014,
      rating: 8.6,
      genre: ["Sci-Fi", "Drama"],
      color: "#1E3A8A",
      particles: 95,
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
      id: 3,
      title: "The Batman",
      year: 2022,
      rating: 8.3,
      genre: ["Action", "Crime"],
      color: "#2C2C2C",
      particles: 80,
      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    },
    {
      id: 4,
      title: "Blade Runner 2049",
      year: 2017,
      rating: 8.0,
      genre: ["Sci-Fi", "Drama"],
      color: "#4A5568",
      particles: 110,
      image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"
    },
    {
      id: 5,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      genre: ["Sci-Fi", "Thriller"],
      color: "#1F2937",
      particles: 105,
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
      id: 6,
      title: "Oppenheimer",
      year: 2023,
      rating: 8.5,
      genre: ["Biography", "Drama"],
      color: "#DC2626",
      particles: 100,
      image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    },
    {
      id: 7,
      title: "Avatar: The Way of Water",
      year: 2022,
      rating: 7.8,
      genre: ["Sci-Fi", "Adventure"],
      color: "#0891B2",
      particles: 115,
      image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
    }
  ];

  // Auto-advance movies every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(0);
      setActiveMovie((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const duration = 5000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [activeMovie]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    const currentMovie = movies[activeMovie];
    
    // Create particles
    for (let i = 0; i < currentMovie.particles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: currentMovie.color
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.3;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Draw text glow
      ctx.font = 'bold 120px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Text shadow effect
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = `rgba(99, 102, 241, ${0.1 - i * 0.005})`;
        ctx.fillText('WATCHLY', canvas.width / 2, canvas.height / 2 + i * 2);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [activeMovie]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Movie Grid Wall */}
      <div className="absolute inset-0">
        <div className="grid grid-cols-8 lg:grid-cols-12 gap-2 p-0 opacity-20">
          {Array.from({ length: 26 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-lg overflow-hidden transform transition-all duration-700 hover:scale-110 hover:z-10 hover:opacity-100"
              style={{
                background: `linear-gradient(45deg, ${movies[i % movies.length].color}20, transparent)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-start justify-center px-6 lg:px-8 pt-12 md:pt-16">
        <div className="w-full max-w-7xl mx-0">
          {/* Floating Movie Cards */}
          <div className="relative h-[400px] md:h-[450px] mb-8 md:mb-10">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className={`absolute transition-all duration-1000 ease-out ${
                  index === activeMovie
                    ? 'z-30 opacity-100 scale-100'
                    : index === (activeMovie + 1) % movies.length || index === (activeMovie - 1 + movies.length) % movies.length
                    ? 'z-20 opacity-60 scale-90 blur-sm'
                    : 'z-10 opacity-30 scale-80 blur-md'
                }`}
                style={{
                  left: `${15 + index * 12}%`,
                  top: `${5 + Math.sin(index) * 15}%`,
                  transform: `rotate(${(index - activeMovie) * 4}deg)`,
                  transformOrigin: 'center center'
                }}
              >
                <div
                  className="w-48 md:w-56 lg:w-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${movie.color}40, transparent)`
                  }}
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-60 md:h-64 object-cover"
                  />
                  <div className="p-4 bg-black/60 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">{movie.year}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-white">{movie.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
                    <div className="flex gap-2 mt-2">
                      {movie.genre.map(g => (
                        <span key={g} className="px-2 py-1 text-xs bg-white/10 rounded-full text-slate-300">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hero Content */}
          <div className="text-center space-y-8 px-4 pb-2 -mt-60">
            {/* Animated Logo */}
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-50 animate-pulse" />
              <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  WATCHLY
                </span>
              </h1>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            {/* Dynamic Tagline */}
            <div className="h-12 overflow-hidden">
              <div className="space-y-4 animate-slide">
                <p className="text-2xl md:text-3xl text-slate-300 font-light px-4">
                  Where <span className="text-indigo-300 font-bold">cinema</span> meets <span className="text-purple-300 font-bold">technology</span>
                </p>
                <p className="text-2xl md:text-3xl text-slate-300 font-light px-4">
                  Discover <span className="text-pink-300 font-bold">stories</span> that <span className="text-cyan-300 font-bold">move</span> you
                </p>
                <p className="text-2xl md:text-3xl text-slate-300 font-light px-4">
                  Your <span className="text-yellow-300 font-bold">personal</span> movie <span className="text-green-300 font-bold">universe</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionDesktop;
