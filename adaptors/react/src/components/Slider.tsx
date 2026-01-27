import { getSliderClasses } from '@sxo/ui';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useStyle } from '../hooks.ts';

export interface SliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    onChange,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const styles = getSliderClasses({ disabled });
    useStyle(`${styles.container} ${styles.track} ${styles.range} ${styles.handle} ${className}`);

    const percentage = ((currentValue - min) / (max - min)) * 100;

    const updateValue = useCallback(
        (clientX: number) => {
            if (disabled || !sliderRef.current) return;

            const rect = sliderRef.current.getBoundingClientRect();
            let pos = (clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));

            let newValue = min + pos * (max - min);
            newValue = Math.round(newValue / step) * step;
            newValue = Math.max(min, Math.min(max, newValue));

            if (!isControlled) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
        },
        [disabled, min, max, step, isControlled, onChange],
    );

    const onMouseDown = (e: React.MouseEvent) => {
        if (disabled) return;
        setIsDragging(true);
        updateValue(e.clientX);
    };

    useEffect(() => {
        if (!isDragging) return;

        const onMouseMove = (e: MouseEvent) => {
            updateValue(e.clientX);
        };

        const onMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, updateValue]);

    return (
        <div
            ref={sliderRef}
            className={`${styles.container} ${className}`.trim()}
            onMouseDown={onMouseDown}
        >
            <div className={styles.track}>
                <div className={styles.range} style={{ width: `${percentage}%` }} />
            </div>
            <div
                className={styles.handle}
                style={{
                    left: `${percentage}%`,
                    transform: 'translateX(-50%)',
                }}
            />
        </div>
    );
};
