import type { TextMessagePartComponent } from "@assistant-ui/react";
import { MarkdownText } from "./markdown-text";
import { AutoQueryExecutor } from "./auto-query-executor";
import { useRef, useEffect, useState } from "react";

interface ExtendedProps {
  content?: string;
  text?: string;
  children?: string;
  [key: string]: unknown;
}

export const MarkdownTextWithAutoExecutor: TextMessagePartComponent = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>('');
  
  // Debug the props to see what's available
  console.log('🔍 MarkdownTextWithAutoExecutor - props:', props);
  
  // Try to get content from props first
  const extendedProps = props as ExtendedProps;
  const propsContent = extendedProps.content || extendedProps.text || extendedProps.children || '';
  
  // Also try to get content from DOM after render
  useEffect(() => {
    if (containerRef.current) {
      const textContent = containerRef.current.textContent || '';
      console.log('🔍 MarkdownTextWithAutoExecutor - DOM content:', textContent.substring(0, 200) + '...');
      setContent(textContent);
    }
  }, [props]);
  
  return (
    <div ref={containerRef}>
      <MarkdownText />
      <AutoQueryExecutor 
        messageContent={content || propsContent} 
      />
    </div>
  );
};
