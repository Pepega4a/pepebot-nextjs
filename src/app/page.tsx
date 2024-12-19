'use client';

import { api } from '@/services/api';
import useTranslation from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';
import Loading from '@/components/ui/Loading';
import { DiscordBot } from '@/types/discord';
import Link from 'next/link';

export default function Home() {
  const [botInfo, setBotInfo] = useState<DiscordBot | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const handleAddToDiscord = () => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback/discord');
    const scope = encodeURIComponent('bot applications.commands');
    const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&response_type=code&redirect_uri=${redirectUri}&integration_type=0&scope=${scope}`;
    window.open(discordUrl, '_blank');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getBotInfo();
        setBotInfo(data);
      } catch (error) {
        console.error("Error fetching bot info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading || !botInfo) return <Loading />;
  return (
    <div>
      <div className="mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-12">
            <div className="flex items-center gap-6">
              <div className='relative'>
                <img
                  src="/fallbacklogo.png"
                  alt={botInfo.username}
                  className="w-24 h-24 rounded-full border-4 border-[#2d332d] sm:flex hidden"
                  loading="lazy"
                  draggable={false}
                />
                <div className={`absolute bottom-0 right-0 w-6 h-6 border-4 rounded-full bg-[#43b581] border-[#2d332d] sm:flex hidden`} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#43b581] mb-2">
                  {botInfo.username}
                </h1>
                <p className="text-gray-300 text-lg mb-4">
                  {t('header.description')}
                </p>
                <div className="flex gap-6">
                  <span className="text-gray-400">
                    <span className="text-[#43b581] font-bold">{botInfo.serverCount || 0}+</span> {t('header.servers')}
                  </span>
                  <span className="text-gray-400">
                    <span className="text-[#43b581] font-bold">{botInfo.commandsCount || 0}</span> {t('header.commands')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#43b581] mb-4">
            {t('welcome.title')}
          </h2>
          <p className="text-gray-300 mb-8">
            {t('welcome.description')}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#43b581] text-center mb-4">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t('features.easyToUse'), description: t('features.easyToUseDescription') },
              { title: t('features.multifunctional'), description: t('features.multifunctionalDescription') },
              { title: t('features.interactiveCommands'), description: t('features.interactiveCommandsDescription') },
              { title: t('features.multilingualSupport'), description: t('features.multilingualSupportDescription') },
              { title: t('features.regularUpdates'), description: t('features.regularUpdatesDescription') },
              { title: t('features.communitySupport'), description: t('features.communitySupportDescription') },
            ].map((feature, index) => (
              <div key={index} className="bg-[#1a1d1a] border border-[#2d332d] p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-[#43b581]">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-xl font-bold text-[#43b581] mb-4">{t('gettingStarted.title')}</h2>
          <p className="text-gray-300 mb-4">{t('gettingStarted.description')}</p>
          <a href="/docs" className="bg-[#43b581] text-white px-4 py-2 rounded-md hover:bg-[#3ca374]">{t('gettingStarted.buttonText')}</a>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-xl font-bold text-[#43b581] mb-4">{t('testimonials.title')}</h2>
          <blockquote className="text-gray-300 mb-4">
            <p>"Pepe Bot значительно упростил управление нашим сервером!"</p>
            <footer>— Алексей, администратор Discord-сервера</footer>
          </blockquote>
          <blockquote className="text-gray-300">
            <p>"Уникальные команды и развлечения, которые предлагает Pepe Bot, делают наш сервер более живым!"</p>
            <footer>— Мария, участник сообщества</footer>
          </blockquote>
        </section>

        <section className="text-center">
          <h2 className="text-xl font-bold text-[#43b581] mb-4">{t('cta.title')}</h2>
          <p className="text-gray-300 mb-4">{t('cta.description')}</p>
          <button onClick={handleAddToDiscord} className="bg-[#43b581] text-white px-4 py-2 rounded-md hover:bg-[#3ca374]">{t('cta.buttonText')}</button>
        </section>
      </main>
    </div>
  );
}