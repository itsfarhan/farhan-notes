import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Java',
      items: [
        'java/index',
        'java/java-notes'
      ],
    },
    {
      type: 'category',
      label: 'AWS',
      items: [
        'aws/index',
        'aws/aws-s3'
      ],
    },
    {
      type: 'category',
      label: 'Kubernetes',
      items: [
        'kubernetes/index',
        'kubernetes/Kubernetes-Beginnings',
        'kubernetes/Kubernetes-Architecture',
        'kubernetes/Pods',
        'kubernetes/Replicasets',
        'kubernetes/Deployments',
        'kubernetes/Daemonsets',
        'kubernetes/Services',
        'kubernetes/Ingress',
        'kubernetes/Autoscaling',
        'kubernetes/Configmaps-and-Secrets',
        'kubernetes/Volumes',
        'kubernetes/Security',
        'kubernetes/Probes',
        'kubernetes/Other-Concepts',
        'kubernetes/Exercises/exercises'
      ],
    },
    {
      type:'category',
      label: 'SQL',
      items:[
        'sql/index',
        'sql/sql101'
      ],
    },
    {
      type: 'category',
      label: 'System Design',
      items: [
        'systemdesign/index',
        'systemdesign/Basics',
        'systemdesign/HLD',
        'systemdesign/Networking Basics',
        'systemdesign/Databases and Storage',
        'systemdesign/Concurrency and Parallelism',
        'systemdesign/API Design',        
        'systemdesign/Designing Reliable Systems',
        'systemdesign/Designing Scalable Systems',
        'systemdesign/Distributed Systems',
        'systemdesign/Microservices',
        'systemdesign/Event Driven Systems',
        'systemdesign/High Availability and Disaster Recovery',
        'systemdesign/Object Oriented Principles',
        'systemdesign/Design Patterns',
        ],
    },
    // {
    //   type: 'category',
    //   label: 'Tools',
    //   items: [
    //     'tools/index',
    //   ],
    // },
  ],
};

export default sidebars;
