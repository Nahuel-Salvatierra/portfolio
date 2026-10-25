"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DeferredSectionProps = {
  children: ReactNode;
  eager?: boolean;
  rootMargin?: string;
  idleTimeoutMs?: number;
  placeholderClassName?: string;
};

export function DeferredSection({
  children,
  eager = false,
  rootMargin = "360px 0px",
  idleTimeoutMs = 4500,
  placeholderClassName = "min-h-[48vh]",
}: DeferredSectionProps) {
  const [active, setActive] = useState(eager);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) return;

    const node = ref.current;
    if (!node) return;

    let done = false;
    const activate = () => {
      if (done) return;
      done = true;
      setActive(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) activate();
      },
      { rootMargin },
    );
    observer.observe(node);

    const requestIdle =
      window.requestIdleCallback?.bind(window) ??
      ((callback: IdleRequestCallback) =>
        window.setTimeout(
          () =>
            callback({
              didTimeout: true,
              timeRemaining: () => 0,
            }),
          idleTimeoutMs,
        ));

    const cancelIdle =
      window.cancelIdleCallback?.bind(window) ?? window.clearTimeout.bind(window);

    const idleId = requestIdle(() => activate(), { timeout: idleTimeoutMs });

    return () => {
      observer.disconnect();
      cancelIdle(idleId);
    };
  }, [active, idleTimeoutMs, rootMargin]);

  return (
    <div ref={ref} className={active ? undefined : placeholderClassName}>
      {active ? children : null}
    </div>
  );
}
