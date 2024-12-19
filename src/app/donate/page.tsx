'use client';

import { useState, useEffect } from 'react';
import Loading from '@/components/ui/Loading';
import useTranslation from '@/hooks/useTranslation';


export default function DonatePage() {
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
            } catch (error) {
                console.error("Error fetching bot info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {t('donate.title')}
        </div>
    );
} 