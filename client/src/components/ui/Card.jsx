import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, title, ...props }) => {
    return (
        <div
            className={twMerge(clsx('bg-white rounded-xl shadow-sm border border-slate-100 p-6', className))}
            {...props}
        >
            {title && <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
