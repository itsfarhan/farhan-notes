import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    // Getting Started
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsed: false,
      items: [
        'intro',
      ],
    },
    
    // Programming Languages
    {
      type: 'category',
      label: '💻 Programming Languages',
      collapsed: true,
      items: [
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
          label: 'SQL',
          items: [
            'sql/index',
            'sql/sql101'
          ],
        },
      ],
    },

    // Cloud Platforms
    {
      type: 'category',
      label: '☁️ Cloud Platforms',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'AWS',
          items: [
            'aws/index',
            'aws/aws-ec2',
            'aws/aws-s3',
            'aws/aws-vpc',
            'aws/aws-iam',
          ],
        },
      ],
    },

    // Cloud Native
    {
      type: 'category',
      label: '🌐 Cloud Native',
      collapsed: true,
      items: [
        'cloudnative/index',
        'cloudnative/istio',
      ],
    },

    // Container Orchestration
    {
      type: 'category',
      label: '🐳 Container Orchestration',
      collapsed: true,
      items: [
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
            'kubernetes/Configmaps-and-Secrets',
            'kubernetes/Volumes',
            'kubernetes/Autoscaling',
            'kubernetes/Security',
            'kubernetes/Probes',
            'kubernetes/Other-Concepts',
            'kubernetes/Exercises/exercises',
          ],
        },
      ],
    },

    // System Design
    {
      type: 'category',
      label: '🏗️ System Design',
      collapsed: true,
      items: [
        'systemdesign/index',
        'systemdesign/Basics',
        'systemdesign/HLD',
        'systemdesign/Networking Basics',
        'systemdesign/Databases and Storage',
        'systemdesign/Concurrency and Parallelism',
        'systemdesign/Designing Scalable Systems',
        'systemdesign/High Availability and Disaster Recovery',
        'systemdesign/API Design',
        'systemdesign/Designing Reliable Systems',
        'systemdesign/Distributed Systems',
        'systemdesign/Microservices',
        'systemdesign/Event Driven Systems',
        'systemdesign/Object Oriented Principles',
        'systemdesign/Design Patterns',
      ],
    },
  ],
};

export default sidebars;
