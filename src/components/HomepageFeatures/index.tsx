import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { Book, FileText, Heart } from 'lucide-react';
import styles from './styles.module.css';

type FeatureItem = {
  id: string;
  title: string;
  subtitle: string;
  description: ReactNode;
  href: string;
  icon: React.ComponentType;
};

const FeatureList: FeatureItem[] = [
  {
    id: 'notes',
    title: 'Knowledge',
    subtitle: 'Base',
    description: (
      <>
        Technical guides covering Java, AWS, Kubernetes, and modern development practices.
        Comprehensive documentation and tutorials for backend development.
      </>
    ),
    href: '/docs/intro',
    icon: Book,
  },
  {
    id: 'blog', 
    title: 'Technical',
    subtitle: 'Blog',
    description: (
      <>
        In-depth articles about software development, cloud computing, and DevOps.
        Real-world experiences and insights from building scalable systems.
      </>
    ),
    href: '/blog',
    icon: FileText,
  },
  {
    id: 'support',
    title: 'Support',
    subtitle: 'Work',
    description: (
      <>
        Help continue creating valuable content and open-source projects.
        Your support enables more tutorials, guides, and community contributions.
      </>
    ),
    href: 'https://ko-fi.com/itsfarhan',
    icon: Heart,
  },
];

function Feature({id, title, subtitle, description, href, icon: Icon}: FeatureItem) {
  const cardClass = clsx(
    styles.featureCard,
    styles[`${id}Card`]
  );
  
  return (
    <div className={clsx('col col--12')}>
      <div className={cardClass}>
        <Link to={href} className={styles.featureContent}>
          <div className={styles.featureIconWrapper}>
            <Icon className={styles.featureIcon} />
          </div>
          <div className={styles.featureText}>
            <Heading as="h3">
              {title} <span className="text--secondary">{subtitle}</span>
            </Heading>
            <p>{description}</p>
            <span className={styles.featureButton}>
              Explore →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className="hero__title">
            Explore
          </Heading>
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

