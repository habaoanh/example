'use client';

import React, { useState, useEffect, useMemo } from 'react';

// Manually define the type for the katex object to avoid module resolution issues.
// This is based on the methods we actually use.
interface KatexObject {
    renderToString(tex: string, options?: {
        throwOnError?: boolean;
        displayMode?: boolean;
    }): string;
}

interface LatexRendererProps {
  content: string;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ content }) => {
  const [katex, setKatex] = useState<KatexObject | null>(null);

  useEffect(() => {
    import('katex').then(katexModule => {
      // The dynamic import provides a 'default' property which is the katex object.
      // We cast it to our defined type to satisfy TypeScript.
      setKatex(katexModule.default as unknown as KatexObject);
    });
  }, []);

  const parts = useMemo(() => content.split(/(\$[^$]+\$)/g), [content]);

  const renderedParts = useMemo(() => {
    if (!katex) {
      // While katex is loading, just show the raw text
      return content;
    }

    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const latex = part.substring(1, part.length - 1);
        try {
          const html = katex.renderToString(latex, {
            throwOnError: false,
            displayMode: false,
          });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch (error) {
          console.error('KaTeX rendering error:', error);
          return <span key={index} className="text-red-500">{part}</span>;
        }
      }
      return <span key={index}>{part}</span>;
    });
  }, [parts, katex, content]);

  if (!katex) {
    return <p>{content}</p>; // Or a loading spinner
  }

  return <p>{renderedParts}</p>;
};

export default LatexRenderer;
