'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import Loading from '@/components/ui/Loading';
import useTranslation from '@/hooks/useTranslation';
import CommandsFilter, { CategoryType } from '@/components/commands/CommandsFilter';
import CommandsCard from '@/components/commands/CommandsCard';
import { LanguageSelector2 } from '@/components/ui/LanguageSelector';
import CommandsExpansionPanel from '@/components/ui/ExpansionPanel';
import { InfoIcon } from '@/components/icons/IconsSvg';
import { BotCommand } from '@/types/discord';


export default function CommandsPage() {
    const [botInfo, setBotInfo] = useState<BotCommand[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getCommands();
                setBotInfo(data);
            } catch (error) {
                console.error("Error fetching bot info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const categories: CategoryType[] = ['general', 'moderation', 'music', 'info'];

    const filterCommands = (commands: BotCommand[]) => {
        return commands.filter(cmd => {
            const matchesCategory = selectedCategory ? cmd.category?.toLowerCase() === selectedCategory : true;
            const matchesName = cmd.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesName;
        });
    };
    const filteredCommands = botInfo ? filterCommands(botInfo) : [];

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder={t('commands.search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-[#2d332d] bg-[#1e231e] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#43b581] transition duration-200 w-full"
                        />
                        <div className="flex items-center ml-2">
                            <LanguageSelector2 size={4} />
                        </div>
                    </div>
                    <div className="bg-[#1e231e] p-4 rounded-lg border border-[#2d332d] h-fit">
                        <CommandsFilter
                            categories={categories}
                            onFilter={setSelectedCategory}
                            commands={botInfo || []}
                        />
                    </div>
                    <div className="mt-4">
                        <CommandsExpansionPanel title={t('commands.help.title')} icon={<InfoIcon />}>
                            <p>{t('commands.help.defaultCommand')} <code>/</code></p>
                            <p>{t('commands.help.cannotChange')}</p>
                            <p>{t('commands.help.botUsageSlash')} <code>/</code></p>
                            <hr className="my-4 border-t border-[#696969]" />
                            <p><strong>{t('commands.help.syntax')}:</strong></p>
                            <ul>
                                <li><code>[]</code> — {t('commands.help.optionalParameter')}</li>
                                <li><code>&lt;&gt;</code> — {t('commands.help.requiredParameter')}</li>
                                <li><code>A | B | C</code> — {t('commands.help.chooseOne')} {t('commands.help.eitherAorB')}</li>
                            </ul>
                        </CommandsExpansionPanel>
                    </div>
                </div>
                <div className="space-y-2">
                    {filteredCommands.map((command, index) => (
                        <motion.div
                            key={`${command.name}-${selectedCategory}-${searchTerm}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <CommandsCard
                                command={command}
                                className="bg-[#1e231e] p-4 rounded-lg border border-[#2d332d]"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
} 