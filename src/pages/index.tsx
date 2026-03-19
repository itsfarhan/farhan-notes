import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { motion, useInView } from 'framer-motion';
import styles from './index.module.css';

// ─── Ambient decorative elements ────────────────────────────────────────────

function AmberEdge() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: 'linear-gradient(to bottom, transparent 0%, var(--amber) 30%, var(--amber) 70%, transparent 100%)',
        opacity: 0.55,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      className={styles.amberEdge}
    />
  );
}

function FarhanWatermark() {
  return (
    <div
      aria-hidden="true"
      className={styles.watermark}
    >
      FARHAN
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    async function initGSAP() {
      const { gsap } = await import('gsap');
      const { SplitText } = await import('gsap/SplitText');
      gsap.registerPlugin(SplitText);

      ctx = gsap.context(() => {
        if (!nameRef.current) return;

        const split = new SplitText(nameRef.current, { type: 'chars' });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Characters drop in
        tl.from(split.chars, {
          y: '110%',
          opacity: 0,
          duration: 1.1,
          stagger: 0.04,
        });

        // Amber rule draws left-to-right
        if (ruleRef.current) {
          tl.from(ruleRef.current, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.7,
            ease: 'power3.inOut',
          }, '-=0.3');
        }

        // Meta line fades up
        if (metaRef.current) {
          tl.from(metaRef.current, {
            y: 16,
            opacity: 0,
            duration: 0.6,
          }, '-=0.4');
        }

        // CTA fades up
        if (ctaRef.current) {
          tl.from(ctaRef.current, {
            y: 12,
            opacity: 0,
            duration: 0.5,
          }, '-=0.3');
        }
      });
    }

    initGSAP();

    return () => ctx?.revert();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        {/* Name — display scale masthead */}
        <div className={styles.nameWrap}>
          <h1 ref={nameRef} className={styles.heroName}>
            Farhan Ahmed
          </h1>
          {/* Amber rule */}
          <div ref={ruleRef} className={styles.amberRule} aria-hidden="true" />
        </div>

        {/* Credentials — mono, restrained */}
        <div ref={metaRef} className={styles.heroMeta}>
          <span className={styles.credential}>Senior Software Engineer</span>
          <span className={styles.credentialDot} aria-hidden="true" />
          <span className={styles.credential}>AWS Community Builder</span>
          <span className={styles.credentialDot} aria-hidden="true" />
          <span className={styles.credential}>Kubernetes · Go · Cloud</span>
        </div>

        {/* Proof points — bare type, no boxes */}
        <div className={styles.proofPoints}>
          <div className={styles.proof}>
            <span className={styles.proofNumber}>50+</span>
            <span className={styles.proofLabel}>Technical Guides</span>
          </div>
          <div className={styles.proof}>
            <span className={styles.proofNumber}>25+</span>
            <span className={styles.proofLabel}>Blog Articles</span>
          </div>
          <div className={styles.proof}>
            <span className={styles.proofNumber}>5</span>
            <span className={styles.proofLabel}>Tech Domains</span>
          </div>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className={styles.heroCta}>
          <Link to="/docs/intro" className={styles.ctaPrimary}>
            Explore Documentation
          </Link>
          <Link to="/blog" className={styles.ctaSecondary}>
            Read the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Content sections ────────────────────────────────────────────────────────

interface SectionItem {
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  tag: string;
}

const sections: SectionItem[] = [
  {
    label: '01',
    title: 'Technical Documentation',
    description:
      'Comprehensive guides covering AWS, Kubernetes, Java, and System Design. Practical examples built from real production experience.',
    href: '/docs/intro',
    cta: 'Start Reading',
    tag: 'Docs',
  },
  {
    label: '02',
    title: 'Technical Blog',
    description:
      'In-depth articles on cloud computing, DevOps, and backend engineering. Honest write-ups from building and operating distributed systems.',
    href: '/blog',
    cta: 'Read Articles',
    tag: 'Blog',
  },
  {
    label: '03',
    title: 'Support This Work',
    description:
      'Help keep the content free and the guides coming. Every contribution enables more tutorials and open-source contributions.',
    href: 'https://ko-fi.com/itsfarhan',
    cta: 'Buy a Coffee',
    tag: 'Support',
  },
];

function SectionCard({ item, index }: { item: SectionItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={styles.sectionCard}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIndex}>{item.label}</span>
        <span className={styles.cardTag}>{item.tag}</span>
      </div>
      <h2 className={styles.cardTitle}>{item.title}</h2>
      <p className={styles.cardDescription}>{item.description}</p>
      <Link to={item.href} className={styles.cardCta}>
        {item.cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </motion.div>
  );
}

function ContentSections() {
  return (
    <section className={styles.sections}>
      <div className={styles.sectionsInner}>
        {sections.map((item, i) => (
          <SectionCard key={item.label} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <Layout
      title="Farhan Ahmed — Senior Software Engineer"
      description="Technical documentation and writing covering AWS, Kubernetes, Go, and cloud-native engineering."
      wrapperClassName={styles.pageWrapper}
    >
      <AmberEdge />
      <FarhanWatermark />
      <HeroSection />
      <ContentSections />
    </Layout>
  );
}
