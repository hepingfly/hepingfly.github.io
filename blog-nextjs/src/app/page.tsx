import HeroSection from '@/components/home/HeroSection';
import FeaturedPosts from '@/components/home/FeaturedPosts';
import AboutSection from '@/components/home/AboutSection';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedPosts />
      <AboutSection />
    </Layout>
  );
}
