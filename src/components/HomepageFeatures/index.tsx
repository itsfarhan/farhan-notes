import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { Book, FileText, Heart, ArrowRight } from 'lucide-react';
import styles from './styles.module.css';

type FeatureItem = {
  id: string;
  title: string;
  description: ReactNode;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  buttonText: string;
};

const FeatureList: FeatureItem[] = [
  {
    id: 'docs',
    title: 'Technical Documentation',
    description: (
      <>
        Comprehensive guides covering <strong>AWS</strong>, <strong>Java</strong>, <strong>Kubernetes</strong>, 
        and <strong>System Design</strong>. Learn backend development with practical examples and best practices.
      </>
    ),
    href: '/docs/intro',
    icon: Book,
    buttonText: 'Start Learning',
  },
  {
    id: 'blog', 
    title: 'Technical Blog',
    description: (
      <>
        In-depth articles about software development, cloud computing, and DevOps. 
        Real-world experiences and insights from building scalable systems.
      </>
    ),
    href: '/blog',
    icon: FileText,
    buttonText: 'Read Articles',
  },
  {
    id: 'support',
    title: 'Support This Work',
    description: (
      <>
        Help continue creating valuable content and open-source projects. 
        Your support enables more tutorials, guides, and community contributions.
      </>
    ),
    href: 'https://ko-fi.com/itsfarhan',
    icon: Heart,
    buttonText: 'Support Me',
  },
];

function Feature({id, title, description, href, icon: Icon, buttonText}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <Icon size={48} aria-hidden="true" />
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
          <Link 
            to={href} 
            className={clsx('button button--primary', styles.featureButton)}
            aria-label={`${buttonText} - ${title}`}
          >
            {buttonText}
            <ArrowRight size={16} className={styles.buttonIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            What You'll Find Here
          </Heading>
          <p className={styles.featuresSubtitle}>
            Everything you need to master backend development and cloud computing
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

