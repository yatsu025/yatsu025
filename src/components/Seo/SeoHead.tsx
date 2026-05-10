import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { allProjects } from '@/data/projectsData';
import { SEO_DEFAULT_DESCRIPTION, SEO_DEFAULT_TITLE } from '@/lib/seo';

const PERSON_SAME_AS = [
  'https://www.linkedin.com/in/yash-srivastava-514252322/',
  'https://github.com/yatsu025',
  'https://www.instagram.com/yash.sri.025/',
] as const;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function normalizeCanonicalPath(pathname: string) {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function getSeoForPath(path: string): {
  title: string;
  robots: string;
} {
  const indexFollow =
    'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

  if (path === '/') {
    return { title: SEO_DEFAULT_TITLE, robots: indexFollow };
  }

  if (path === '/certifications') {
    return {
      title: 'Certifications | Yash Srivastava — Freelance Web Developer, Prayagraj',
      robots: indexFollow,
    };
  }

  if (path.startsWith('/certification/')) {
    const id = path.slice('/certification/'.length);
    if (!id) {
      return { title: `Page not found | Yash Srivastava`, robots: 'noindex,nofollow' };
    }
    return {
      title: 'Certification | Yash Srivastava — Freelance Web Developer, Prayagraj',
      robots: indexFollow,
    };
  }

  if (path.startsWith('/project/')) {
    const id = path.replace(/^\/project\//, '');
    const proj = allProjects.find((p) => p.id === id);
    if (proj) {
      return {
        title: `${proj.title} | Yash Srivastava — Prayagraj`,
        robots: indexFollow,
      };
    }
    return {
      title: 'Project not found | Yash Srivastava',
      robots: 'noindex,nofollow',
    };
  }

  return {
    title: 'Page not found | Yash Srivastava',
    robots: 'noindex,nofollow',
  };
}

/**
 * SPA SEO: title, canonical, Open Graph, Twitter, robots, JSON-LD (WebSite + Person + ProfessionalService).
 * Uses current origin so your deployed domain works without hardcoding.
 */
const SeoHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const origin = window.location.origin;
    const path = normalizeCanonicalPath(pathname);
    const canonical = path === '/' ? `${origin}/` : `${origin}${path}`;
    const { title, robots } = getSeoForPath(path);

    document.title = title;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    const desc = SEO_DEFAULT_DESCRIPTION;
    const imageUrl = `${origin}/photo.jpg`;

    setMeta('name', 'description', desc);
    setMeta('name', 'robots', robots);

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('property', 'og:site_name', 'Yash Srivastava');
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:alt', 'Yash Srivastava — Freelance Web Developer in Prayagraj');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', imageUrl);

    document.querySelectorAll('script[data-seo-jsonld="1"]').forEach((n) => n.remove());

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: `${origin}/`,
          name: SEO_DEFAULT_TITLE,
          description: desc,
          inLanguage: 'en-IN',
          publisher: { '@id': `${origin}/#person` },
        },
        {
          '@type': 'Person',
          '@id': `${origin}/#person`,
          name: 'Yash Srivastava',
          jobTitle: 'Freelance Web Developer',
          url: `${origin}/`,
          image: imageUrl,
          email: 'yashsrivastava1808@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Prayagraj',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
          knowsAbout: [
            'Web Development',
            'React',
            'TypeScript',
            'Landing Pages',
            'Freelancing',
            'Prayagraj',
            'Prayagraj web developer',
          ],
          sameAs: [...PERSON_SAME_AS],
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${origin}/#service`,
          name: 'Yash Srivastava — Freelance Web Development',
          image: imageUrl,
          url: `${origin}/`,
          description: desc,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Prayagraj',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
          areaServed: [
            { '@type': 'City', name: 'Prayagraj' },
            { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
            { '@type': 'Country', name: 'India' },
          ],
          priceRange: '₹₹',
          provider: { '@id': `${origin}/#person` },
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', '1');
    script.textContent = JSON.stringify(graph);
    document.head.appendChild(script);
  }, [pathname]);

  return null;
};

export default SeoHead;
