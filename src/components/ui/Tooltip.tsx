'use client';

import { motion, Variants } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    className?: string;
    text: string;
}

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    closed: {
        opacity: 0,
        y: 10,
        transition: { duration: 0.15 }
    }
};


const Tooltip = ({ children, text, className }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <AnimatePresence>
            <div
                className={`${className}`}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
                {visible && (
                    <motion.div
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className='absolute bg-gray-700 text-white text-xs rounded py-1 px-2 z-10'
                        style={{ top: '100%',transform: 'translateX(300%)' }}
                    >
                        {text}
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    );
};

export default Tooltip;