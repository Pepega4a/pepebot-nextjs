'use client';

import { useEffect, useRef } from 'react';
import { XMarkIcon as XIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ title, content, onClose }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
            >
                <motion.div
                    ref={modalRef}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.3 }}
                    className='bg-[#1e231e] rounded-lg w-full max-w-2xl p-6 m-4'
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                        <button
                            onClick={onClose}
                            
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {content}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 