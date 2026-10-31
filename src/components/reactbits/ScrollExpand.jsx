'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ScrollExpand.css';

export default function ScrollExpand({
  src = '/hero.jpg',
  alt = 'Product hero',
  title = '',
  scrollHint = '',
  useWindowScroll = false,
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  enabled = true,
  children,
  className = '',
  style
}) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const scrimRef = useRef(null);

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef(null);
  const [showHint, setShowHint] = useState(Boolean(scrollHint));

  const updateStyles = useCallback((p) => {
    if (!frameRef.current) return;

    // Calculate dimensions based on progress
    // Phase 1: 0 to (1 - holdDistance) is the expansion phase
    const expansionRatio = Math.max(0.1, 1 - holdDistance);
    const expandProgress = Math.min(Math.max(p / expansionRatio, 0), 1);

    const currentWidth = startWidth + (100 - startWidth) * expandProgress;
    const currentHeight = startHeight + (100 - startHeight) * expandProgress;
    const currentRadius = startRadius + (endRadius - startRadius) * expandProgress;
    const currentZoom = mediaZoom - (mediaZoom - 1.0) * expandProgress;
    const currentScrim = overlayScrim * expandProgress;

    frameRef.current.style.width = `${currentWidth.toFixed(2)}%`;
    frameRef.current.style.height = `${currentHeight.toFixed(2)}%`;
    frameRef.current.style.borderRadius = `${currentRadius.toFixed(1)}px`;

    if (mediaRef.current) {
      mediaRef.current.style.transform = `scale(${currentZoom.toFixed(3)})`;
    }

    if (scrimRef.current) {
      scrimRef.current.style.opacity = currentScrim.toFixed(3);
    }
  }, [startWidth, startHeight, startRadius, endRadius, mediaZoom, holdDistance, overlayScrim]);

  useEffect(() => {
    if (!enabled) {
      updateStyles(1);
      return;
    }

    let running = true;

    const lerpLoop = () => {
      const diff = targetProgressRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0005) {
        progressRef.current += diff * smoothing;
        updateStyles(progressRef.current);
      } else {
        progressRef.current = targetProgressRef.current;
        updateStyles(progressRef.current);
      }

      if (running) {
        rafRef.current = requestAnimationFrame(lerpLoop);
      }
    };

    rafRef.current = requestAnimationFrame(lerpLoop);

    const handleScroll = () => {
      if (!containerRef.current) return;

      if (useWindowScroll) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Total track length
        const totalScrollable = (rect.height - windowHeight) * scrollDistance;
        const scrolled = -rect.top;
        const rawProgress = totalScrollable > 0 ? scrolled / totalScrollable : 0;
        targetProgressRef.current = Math.min(Math.max(rawProgress, 0), 1);
      } else {
        // Container scroll/wheel handling
        const container = containerRef.current;
        const maxScroll = (container.scrollHeight - container.clientHeight) || 1;
        const rawProgress = container.scrollTop / maxScroll;
        targetProgressRef.current = Math.min(Math.max(rawProgress, 0), 1);
      }

      if (targetProgressRef.current > 0.05) {
        setShowHint(false);
      } else if (scrollHint) {
        setShowHint(true);
      }
    };

    // When useWindowScroll is false, allow wheel events inside container to drive expansion
    const handleWheel = (e) => {
      if (useWindowScroll) return;
      const delta = e.deltaY;
      const sensitivity = 0.0015 / scrollDistance;
      targetProgressRef.current = Math.min(Math.max(targetProgressRef.current + delta * sensitivity, 0), 1);
      if (targetProgressRef.current > 0.05) {
        setShowHint(false);
      }
    };

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);
      handleScroll();
    } else {
      const el = containerRef.current;
      if (el) {
        el.addEventListener('scroll', handleScroll, { passive: true });
        el.addEventListener('wheel', handleWheel, { passive: true });
      }
    }

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      } else {
        const el = containerRef.current;
        if (el) {
          el.removeEventListener('scroll', handleScroll);
          el.removeEventListener('wheel', handleWheel);
        }
      }
    };
  }, [enabled, useWindowScroll, scrollDistance, smoothing, scrollHint, updateStyles]);

  return (
    <div
      ref={containerRef}
      className={`scroll-expand ${useWindowScroll ? 'scroll-expand--window' : ''} ${className}`.trim()}
      style={style}
    >
      <div className="scroll-expand__sticky">
        <div ref={frameRef} className="scroll-expand__frame">
          <div className="scroll-expand__media-wrap">
            <img
              ref={mediaRef}
              src={src}
              alt={alt}
              className="scroll-expand__media"
              loading="lazy"
            />
          </div>

          <div ref={scrimRef} className="scroll-expand__scrim" />

          {(title || children) && (
            <div className="scroll-expand__overlay">
              {title && <h2 className="scroll-expand__title">{title}</h2>}
              {children}
            </div>
          )}

          {scrollHint && showHint && (
            <div className="scroll-expand__hint">
              <span className="scroll-expand__hint-dot" />
              <span>{scrollHint}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
