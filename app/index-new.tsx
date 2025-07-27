import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing page
    router.replace('/landing');
  }, []);

  return null;
}
