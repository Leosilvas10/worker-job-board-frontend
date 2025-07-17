import { useState, useEffect, useRef } from 'react';
import { BACKEND_URL } from '../config/backend';

function formatJobCount(count) {
  if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
  return count.toString();
}

export const useJobStats = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    newJobsToday: 0,
    companies: 0,
    applicants: 0,
    formatted: {
      totalJobsFormatted: '0',
      recentJobsFormatted: '0',
    },
  });
  const [loading, setLoading] = useState(true);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    const fetchStats = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/all-jobs-combined`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Frontend-Stats-API',
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Sempre usar o campo 'data' do endpoint
          const jobsArr = Array.isArray(data.data) ? data.data : [];
          const totalJobs = jobsArr.length;
          const recentJobs = Math.floor(totalJobs * 0.15);
          const formattedStats = {
            totalJobs: totalJobs,
            newJobsToday: recentJobs,
            companies: Math.floor(totalJobs * 0.6),
            applicants: Math.floor(totalJobs * 8),
            formatted: {
              totalJobsFormatted: formatJobCount(totalJobs),
              recentJobsFormatted: formatJobCount(recentJobs),
            },
          };
          setStats(formattedStats);
          hasLoaded.current = true;
        } else {
          throw new Error(`Backend retornou status ${response.status}`);
        }
      } catch (error) {
        console.error('Erro ao buscar estatísticas do backend:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, loading };
};
