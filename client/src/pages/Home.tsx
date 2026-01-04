import Layout from '@/components/Layout';
import YearGrid from '@/components/YearGrid';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in duration-700">
        <YearGrid />
      </div>
    </Layout>
  );
}
