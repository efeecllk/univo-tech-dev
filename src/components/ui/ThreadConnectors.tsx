'use client';

import { useState, useEffect } from 'react';

/**
 * ThreadConnector: Vertical line connecting parent to last child
 */
export const ThreadConnector = ({ 
    containerRef, 
    startRef, 
    endRefs,
    offsetX = 0
}: { 
    containerRef: React.RefObject<HTMLDivElement | null>;
    startRef: React.RefObject<HTMLDivElement | null>;
    endRefs: React.RefObject<(HTMLDivElement | null)[]>;
    offsetX?: number;
}) => {
    const [geometry, setGeometry] = useState({ startY: 0, endY: 0, visible: false });
    
    useEffect(() => {
        const calculate = () => {
            if (!containerRef.current || !startRef.current) return;
            
            const containerRect = containerRef.current.getBoundingClientRect();
            const startRect = startRef.current.getBoundingClientRect();
            const startCenterY = startRect.top + startRect.height / 2 - containerRect.top;
            
            const endElements = endRefs.current?.filter(el => el !== null) || [];
            if (endElements.length === 0) {
                setGeometry({ startY: 0, endY: 0, visible: false });
                return;
            }
            
            const lastEnd = endElements[endElements.length - 1];
            if (!lastEnd) return;
            
            const endRect = lastEnd.getBoundingClientRect();
            const endCenterY = endRect.top + endRect.height / 2 - containerRect.top;
            
            setGeometry({ 
                startY: startCenterY, 
                // Stop the rail 12px early (at the start of the curve radius) to avoid "protrusion" below the branch
                endY: endCenterY - 12,
                visible: true
            });
        };
        
        const timer = setTimeout(calculate, 100);
        const observer = new ResizeObserver(calculate);
        if (containerRef.current) observer.observe(containerRef.current);
        
        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [containerRef, startRef, endRefs]);
    
    if (!geometry.visible || geometry.endY <= geometry.startY) return null;
    
    return (
        <div 
            className="absolute w-[2px] bg-neutral-200 dark:bg-neutral-800 transition-all duration-300 pointer-events-none z-10"
            style={{ 
                left: offsetX,
                top: geometry.startY, 
                height: geometry.endY - geometry.startY 
            }}
        />
    );
};

/**
 * BranchConnector: L-shaped curve from vertical line to avatar
 */
export const BranchConnector = ({
    containerRef,
    avatarRef,
    offsetX = 0
}: {
    containerRef: React.RefObject<HTMLDivElement | null>;
    avatarRef: React.RefObject<HTMLDivElement | null>;
    offsetX?: number;
}) => {
    const [geometry, setGeometry] = useState({ y: 0, width: 0, visible: false });
    
    useEffect(() => {
        const calculate = () => {
            if (!containerRef.current || !avatarRef.current) return;
            
            const offsetParent = avatarRef.current.offsetParent as HTMLElement;
            if (!offsetParent) return;

            const parentRect = offsetParent.getBoundingClientRect();
            const avatarRect = avatarRef.current.getBoundingClientRect();
            
            const avatarCenterY = avatarRect.top + avatarRect.height / 2 - parentRect.top;
            const avatarCenterX = avatarRect.left + avatarRect.width / 2 - parentRect.left;
            
            const branchWidth = avatarCenterX - offsetX;
            
            setGeometry({
                y: avatarCenterY - 12,
                width: branchWidth,
                visible: true
            });
        };
        
        const timer = setTimeout(calculate, 100);
        const observer = new ResizeObserver(calculate);
        if (containerRef.current) observer.observe(containerRef.current);
        
        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [containerRef, avatarRef, offsetX]);
    
    if (!geometry.visible || geometry.width <= 0) return null;
    
    return (
        <div 
            className="absolute border-l-[2px] border-b-[2px] border-neutral-200 dark:border-neutral-800 rounded-bl-xl pointer-events-none z-10"
            style={{ 
                left: offsetX,
                top: geometry.y, 
                width: geometry.width,
                height: 12 
            }}
        />
    );
};
