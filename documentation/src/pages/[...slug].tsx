import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import { SxoDemo } from '../components/SxoDemo';
import { SxoApiTable } from '../components/SxoApiTable';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

// Load all markdown files
const docs = import.meta.glob('../content/**/*.md', { query: '?raw', eager: true });

const DocPage: React.FC = () => {
    const location = useLocation();
    
    const path = location.pathname;
    
    const contentKey = useMemo(() => {
        const p = path.endsWith('/') ? `${path}index` : path;
        const key = `../content${p}.md`;
        if (docs[key]) return key;
        
        // Try /index if not found
        const indexKey = `../content${p}/index.md`;
        if (docs[indexKey]) return indexKey;
        
        return null;
    }, [path]);

    const rawContent = contentKey ? (docs[contentKey] as any)?.default || '' : '';

    const contentElements = useMemo(() => {
        if (!rawContent) return null;

        const components: any[] = [];
        const md = new MarkdownIt({ html: true });

        // 1. Extract and replace SxoDemo and SxoApiTable tags with placeholders
        let processedContent = rawContent.replace(/<(SxoDemo|SxoApiTable)\s+([^>]+)\/>/g, (match: string, tagName: string, attrsStr: string) => {
            const attrs: any = { _type: tagName };
            // Parse attributes
            attrsStr.replace(/([^:=\s]+)=(['"])(.*?)\2|:([^:=\s]+)=(['"])(.*?)\5/g, (m, k1, q1, v1, k2, q2, v2) => {
                if (k1) {
                    attrs[k1] = v1;
                } else if (k2) {
                    const jsonStr = v2.trim();
                    const key = k2;
                    console.log(`[Parser] Parsing attribute ${key} for ${tagName}:`, jsonStr);
                    try {
                        const finalJsonStr = jsonStr.startsWith('{') ? jsonStr : `{${jsonStr}}`;
                        const parsed = new Function(`return (${finalJsonStr})`)();
                        console.log(`[Parser] Successfully parsed attribute ${key} for ${tagName}:`, parsed);
                        attrs[key] = parsed;
                    } catch (e) {
                        console.error(`[Parser] Failed to parse attribute ${key} for ${tagName}:`, jsonStr, e);
                        attrs[key] = jsonStr;
                    }
                }
                return m;
            });
            
            const index = components.length;
            components.push(attrs);
            return `\n\n<div data-sxo-component="${index}"></div>\n\n`;
        });

        // 2. Render markdown to HTML
        const html = md.render(processedContent);

        // 3. Split HTML by placeholders and interleave with components
        const parts = html.split(/<div data-sxo-component="(\d+)"><\/div>/);
        return parts.map((part, i) => {
            if (i % 2 === 0) {
                return <div key={i} dangerouslySetInnerHTML={{ __html: part }} />;
            } else {
                const compIndex = parseInt(part);
                const compProps = components[compIndex];
                
                if (compProps._type === 'SxoDemo') {
                    return (
                        <SxoDemo 
                            key={i} 
                            component={compProps.component} 
                            props={compProps.props} 
                            content={compProps.content} 
                        />
                    );
                } else if (compProps._type === 'SxoApiTable') {
                    return (
                        <SxoApiTable 
                            key={i} 
                            component={compProps.component} 
                        />
                    );
                }
                return null;
            }
        });
    }, [rawContent]);

    if (!rawContent) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600">页面未找到: {path}</p>
            </div>
        );
    }

    return (
        <article className="prose prose-indigo prose-lg max-w-none">
            {contentElements}
        </article>
    );
};

export default DocPage;
