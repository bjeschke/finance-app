import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export type TrendType = 'bullish' | 'bearish' | 'neutral';

export const getTrendColor = (trend: TrendType): string => {
    switch (trend) {
        case 'bullish': return 'text-emerald-500';
        case 'bearish': return 'text-red-500';
        case 'neutral': return 'text-amber-500';
    }
};

export const getTrendBorder = (trend: TrendType): string => {
    switch (trend) {
        case 'bullish': return 'border-l-emerald-500';
        case 'bearish': return 'border-l-red-500';
        case 'neutral': return 'border-l-amber-500';
    }
};

export const getTrendBg = (trend: TrendType): string => {
    switch (trend) {
        case 'bullish': return 'bg-emerald-50';
        case 'bearish': return 'bg-red-50';
        case 'neutral': return 'bg-amber-50';
    }
};

export const getTrendProgressColor = (trend: TrendType): string => {
    switch (trend) {
        case 'bullish': return 'bg-emerald-500';
        case 'bearish': return 'bg-red-500';
        case 'neutral': return 'bg-amber-500';
    }
};

export const getTrendIcon = (trend: TrendType, size: 'sm' | 'md' | 'lg' = 'md'): React.ReactElement => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
    const colorClass = getTrendColor(trend);

    switch (trend) {
        case 'bullish':
            return React.createElement(TrendingUp, { className: `${sizeClass} ${colorClass}` });
        case 'bearish':
            return React.createElement(TrendingDown, { className: `${sizeClass} ${colorClass}` });
        case 'neutral':
            return React.createElement(Activity, { className: `${sizeClass} ${colorClass}` });
    }
};

export const getTrendLabel = (trend: TrendType): string => {
    switch (trend) {
        case 'bullish': return 'Bullish';
        case 'bearish': return 'Bearish';
        case 'neutral': return 'Neutral';
    }
};