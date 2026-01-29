import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

// Load all markdown files
const docs = import.meta.glob('../content/**/*.md', { query: '?raw', eager: true });

const DocPage: React.FC = () => {
    const location = useLocation();
    const path = location.pathname === '/' ? '/index' : location.pathname;
    
    // Find the matching markdown file
    const contentKey = `../content${path}.md`;
    const rawContent = (docs[contentKey] as any)?.default || '';
    const htmlContent = md.render(rawContent);

    if (!rawContent) {
        return <h1>404 - Not Found ({contentKey})</h1>;
    }

    return (
        <div className="prose prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default DocPage;
