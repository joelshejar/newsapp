import React, { useEffect, useState, useRef } from "react";
import useForceRerender from "../Hooks/useForceRerenderer";

const InfiniteScroll = ({ handlerFunc, isLazyLoading = "list-item" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  const forceRerender = useForceRerender();

  useEffect(() => {
    forceRerender();
  }, []);

  useEffect(() => {
    if (isVisible) {
      handlerFunc();
    }
  }, [isVisible]);

  useEffect(() => {
    if (!elementRef) return;
    const observer = new IntersectionObserver(onVisibilityChange);
    observer.observe(elementRef.current);

    return () => observer.unobserve(elementRef.current);
  }, [elementRef]);

  const onVisibilityChange = (entries) =>
    setIsVisible(entries[0].isIntersecting);

  return <div ref={elementRef} className={isLazyLoading}></div>;
};

export default InfiniteScroll;
