import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

const DocPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Determine the language and path from slug
                // For example: zh-CN/guide/getting-started
                const path = slug || 'index';
                const res = await fetch(`/src/content/${path}.md`);
                if (res.ok) {
                    const text = await res.text();
                    setContent(md.render(text));
                } else {
                    setContent('<h1>404 - Not Found</h1>');
                }
            } catch (err) {
                console.error('Failed to load doc:', err);
                setContent('<h1>Error loading documentation</h1>');
            }
        };

        loadContent();
    }, [slug]);

    return (
        <div className="prose prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default DocPage;
