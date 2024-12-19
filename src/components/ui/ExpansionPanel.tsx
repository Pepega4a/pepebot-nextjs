'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ExpansionPanelProps {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode | null;
}

const itemVariants: Variants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    closed: { opacity: 0, y: 20, transition: { duration: 0.15 } }
};

export default function ExpansionPanel({ title, children, icon }: ExpansionPanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-[#2d332d] rounded-md mb-4 bg-[#1e231e]">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full p-4 text-left text-white bg-[#1e231e] hover:bg-[#2d332d]"
                tabIndex={0}
            >
                {title}
                <motion.div>
                    {icon}
                </motion.div>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="p-4 border-t border-[#2d332d] bg-[#2d332d] text-white"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}