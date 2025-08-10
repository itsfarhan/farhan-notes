// React and essential imports
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Lucide React icons
import { Book, FileText, Heart, ArrowRight, Mail, Github, ExternalLink } from 'lucide-react';

// Component styles
import styles from './index.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Brand Hero Section Component
 * 
 * Features:
 * - Dark brand theme (hsl(0 0% 3.9%))
 * - "FARHAN AHMED" with glitch animation
 * - Smooth scroll animations
 * - Cinematic blog slides
 * - Modern navigation layout
 */
function HomepageHeader() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const {siteConfig} = useDocusaurusContext();
  
  // Navigation items for the hero
  const navigation = [
    {
      id: 'notes',
      title: 'Notes',
      description: 'Technical guides & documentation',
      href: '/docs/intro',
      icon: Book,
      color: 'hsl(0 0% 80%)'
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Articles & insights',
      href: '/blog',
      icon: FileText, 
      color: 'hsl(0 0% 75%)'
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch',
      href: 'https://farhanahmed.pro/contact',
      icon: Mail,
      color: 'hsl(0 0% 70%)'
    },
    {
      id: 'support',
      title: 'Support',
      description: 'Support my work',
      href: 'https://ko-fi.com/itsfarhan',
      icon: Heart,
      color: 'hsl(0 0% 65%)'
    }
  ];
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();
      
      // Glitch effect for main title
      tl.set(titleRef.current, { opacity: 0 })
        .to(titleRef.current, {
          opacity: 1,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power2.inOut",
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
        })
        .from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.5")
        .set(navRef.current?.children || [], {
          opacity: 1,
          y: 0,
        });
      
      // Water-like fluid effect on hover - no emerald green
      if (titleRef.current) {
        titleRef.current.addEventListener('mouseenter', () => {
          gsap.to(titleRef.current, {
            filter: 'blur(1px) saturate(1.5)',
            transform: 'scale(1.05)',
            duration: 0.3,
          });
        });
        
        titleRef.current.addEventListener('mouseleave', () => {
          gsap.to(titleRef.current, {
            filter: 'blur(0px) saturate(1)',
            transform: 'scale(1)',
            duration: 0.3,
          });
        });
      }
      
      // Scroll-triggered animations for cards
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children, 
          {
            opacity: 0,
            y: 100,
            rotationX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <header ref={heroRef} className={styles.brandHero}>
      {/* Animated background particles */}
      <div className={styles.particles}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>
      
      <div className={styles.heroContent}>
        {/* Main brand title with glitch effect */}
        <div className={styles.titleSection}>
          <h1 ref={titleRef} className={styles.brandTitle}>
            FARHAN AHMED
          </h1>
          <p ref={subtitleRef} className={styles.brandSubtitle}>
            Backend Developer & AWS Community Builder
          </p>
        </div>
        
        {/* Navigation grid - Minimal & Sleek */}
        <div ref={navRef} className={styles.navigationGrid}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={styles.navCard}
                style={{'--card-color': item.color} as React.CSSProperties}
              >
                <div className={styles.navCardIcon}>
                  <Icon size={20} />
                </div>
                <span className={styles.navCardTitle}>{item.title}</span>
                <div className={styles.navCardArrow}>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

/**
 * Blog Slides Section Component
 * 
 * Features horizontal scrolling blog preview cards
 * with smooth GSAP animations triggered by scroll
 */
function BlogSlides() {
  const slidesRef = useRef<HTMLDivElement>(null);
  
  // Mock blog data - in real implementation, fetch from your blog
  const blogPosts = [
    {
      id: 1,
      title: "AWS Lambda Best Practices",
      excerpt: "Learn how to optimize your serverless functions for performance and cost.",
      date: "2024-01-15",
      category: "AWS",
      image: "/img/blog/lambda-practices.jpg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Kubernetes Deployment Strategies",
      excerpt: "Explore different deployment patterns for containerized applications.",
      date: "2024-01-10",
      category: "DevOps",
      image: "/img/blog/k8s-deployment.jpg",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Java Spring Boot Microservices",
      excerpt: "Building scalable microservices architecture with Spring Boot.",
      date: "2024-01-05",
      category: "Java",
      image: "/img/blog/spring-microservices.jpg",
      readTime: "12 min read"
    },
    {
      id: 4,
      title: "Database Optimization Techniques",
      excerpt: "Advanced techniques to improve database performance and reliability.",
      date: "2023-12-28",
      category: "Database",
      image: "/img/blog/db-optimization.jpg",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "CI/CD Pipeline Best Practices",
      excerpt: "Setting up efficient continuous integration and deployment workflows.",
      date: "2023-12-20",
      category: "DevOps",
      image: "/img/blog/cicd-practices.jpg",
      readTime: "7 min read"
    }
  ];
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      // Horizontal scroll animation for blog slides
      if (slidesRef.current) {
        const slides = slidesRef.current.children;
        
        gsap.fromTo(slides, 
          {
            x: 100,
            opacity: 0,
            rotationY: 15,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: slidesRef.current,
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play none none reverse",
            },
          }
        );
        
        // Continuous parallax effect on scroll
        gsap.to(slides, {
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: slidesRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, slidesRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section className={styles.blogSlides}>
      <div className={styles.blogSlidesContainer}>
        <div className={styles.blogSlidesHeader}>
          <h2>Latest Insights</h2>
          <p>Explore my latest articles and technical deep-dives</p>
          <Link to="/blog" className={styles.viewAllLink}>
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>
        
        <div ref={slidesRef} className={styles.blogSlidesGrid}>
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog`} className={styles.blogSlide}>
              <div className={styles.blogSlideImage}>
                <div className={styles.blogSlideCategory}>{post.category}</div>
              </div>
              <div className={styles.blogSlideContent}>
                <div className={styles.blogSlideMeta}>
                  <span className={styles.blogSlideDate}>{post.date}</span>
                  <span className={styles.blogSlideReadTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.blogSlideTitle}>{post.title}</h3>
                <p className={styles.blogSlideExcerpt}>{post.excerpt}</p>
                <div className={styles.blogSlideFooter}>
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  useEffect(() => {
    // Initialize Lenis smooth scroll
    if (typeof window !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      
      requestAnimationFrame(raf);
      
      // Cleanup
      return () => {
        lenis.destroy();
      };
    }
  }, []);
  
  return (
    <Layout
      title={`${siteConfig.title} - Knowledge Base`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <BlogSlides />
    </Layout>
  );
}
