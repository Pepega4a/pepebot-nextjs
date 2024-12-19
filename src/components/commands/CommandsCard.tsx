'use client';

import { useState } from 'react';
import useTranslation from '@/hooks/useTranslation';
import Modal from '../ui/Modal';
import { CommandOption } from '@/types/discord';
import Tooltip from '../ui/Tooltip';

interface CommandsCardProps {
    command: {
        name: string;
        description: string;
        category?: string;
        usage?: string;
        examples?: string[];
        options?: CommandOption[];
    };
    className?: string;
}

export default function CommandsCard({ command, className = '' }: CommandsCardProps) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };

    const commandDescription = t(`commands.descriptions.${command.name}`) || command.description;

    const formatOption = (option: CommandOption) => {
        let formattedOption = '';
        switch (option.type) {
            case 6:
                formattedOption = option.required ? `<@${option.name}> ` : `@${option.name}] `;
                break;
            case 7:
                formattedOption = option.required ? `<#${option.name}> ` : `#${option.name}] `;
                break;
            case 8:
                formattedOption = option.required ? `<@&${option.name}> ` : `@&${option.name}] `;
                break;
            default:
                formattedOption = option.required ? `<${option.name}> ` : `[${option.name}] `;
        }
        return formattedOption;
    };

    return (
        <>
            <div
                className={`${className} hover:border-[#43b581] relative transition-colors cursor-pointer`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex items-center">
                    <h3 className="text-lg font-medium text-[#43b581] mb-1 flex items-center gap-2">
                        /{command.name}
                    </h3>
                </div>
                {command.category?.toLowerCase() === 'moderation' && (
                    <Tooltip className='absolute right-6 top-1/2 transform -translate-y-1/2' text={t(`commands.moderatorcommands`)}>
                        <svg className="w-4 h-4 text-[#43b581]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                        </svg>
                    </Tooltip>
                )}
                <p className="text-gray-300">
                    {commandDescription}
                </p>
            </div>
            {isModalOpen && (
                <Modal
                    title={`Command: ${command.name}`}
                    onClose={() => setIsModalOpen(false)}
                    content={
                        <div>
                            <p className="text-gray-300">{commandDescription}</p>

                            {command.usage && (
                                <div>
                                    <h4 className="text-gray-400 font-medium mb-2">{t('commands.usage')}</h4>
                                    <div className='bg-[#2a2d2a] rounded-full p-3 inline-block'>
                                        <code className='text-white'>
                                            /{command.name} {
                                                command.options?.map((option) => {
                                                    const formattedOption = formatOption(option);
                                                    return (
                                                        <span key={option.name}>
                                                            <span className={formattedOption.startsWith('<@') || formattedOption.startsWith('[@') ? 'text-blue-500' : formattedOption.startsWith('<#') || formattedOption.startsWith('[#') ? 'text-green-500' : formattedOption.startsWith('<@&') || formattedOption.startsWith('[@&') ? 'text-purple-500' : ''}>
                                                                {formattedOption}
                                                            </span>
                                                        </span>
                                                    );
                                                })}
                                        </code>
                                    </div>
                                </div>
                            )}

                            {command.examples && (
                                <div>
                                    <h4 className="text-gray-400 font-medium mb-2">Примеры:</h4>
                                    <div className="space-y-2">
                                        {command.examples.map((example, index) => (
                                            <div key={index} className="flex justify-between items-center bg-[#1a1d1a] p-2 rounded">
                                                <code className="text-gray-300">{example}</code>
                                                <button
                                                    onClick={() => handleCopy(example)}
                                                    className="text-gray-500 hover:text-[#43b581] transition-colors"
                                                >
                                                    {copiedText === example ? (
                                                        <span className="text-[#43b581]">{t('commands.copied')}</span>
                                                    ) : (
                                                        <span>{t('commands.copy')}</span>
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                />
            )}
        </>
    );
}