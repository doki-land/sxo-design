import React from 'react';
import * as SxoReact from '@sxo/react';
import { SxoCodeGroup, SxoCodeBlock } from './SxoCodeGroup';

interface SxoDemoProps {
    component: string;
    props?: Record<string, any>;
    content?: string;
    children?: React.ReactNode;
}

export const SxoDemo: React.FC<SxoDemoProps> = ({ component, props = {}, content, children }) => {
    const Component = (SxoReact as any)[component] || (SxoReact as any)[component.replace('Sxo', '')];

    const generateCode = (frameworkId: string) => {
        const compName = component.startsWith('Sxo') ? component : `Sxo${component}`;
        const baseName = component.replace('Sxo', '');
        const propEntries = Object.entries(props);
        
        const vuePropStr = propEntries
            .map(([k, v]) => {
                if (typeof v === 'string') return `${k}="${v}"`;
                if (typeof v === 'boolean') return v ? k : `:${k}="false"`;
                return `:${k}="${JSON.stringify(v).replace(/"/g, "'")}"`;
            })
            .join(' ');

        const reactPropStr = propEntries
            .map(([k, v]) => {
                if (typeof v === 'string') return `${k}="${v}"`;
                if (typeof v === 'boolean') return v ? k : `${k}={false}`;
                return `${k}={${JSON.stringify(v)}}`;
            })
            .join(' ');

        switch (frameworkId) {
            case 'vue':
                return `<template>\n  <${compName} ${vuePropStr}>\n    ${content || 'Content'}\n  </${compName}>\n</template>`;
            case 'react':
                return `import { ${baseName} } from '@sxo/react';\n\nexport default () => (\n  <${baseName} ${reactPropStr}>\n    ${content || 'Content'}\n  </${baseName}>\n);`;
            default:
                return `// Code for ${frameworkId} coming soon...`;
        }
    };

    return (
        <div className="sxo-demo-container border rounded-xl overflow-hidden my-8 bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
            <div className="sxo-demo-preview p-10 flex flex-wrap gap-4 items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] bg-[#f9fafb]">
                {children ? children : (Component ? <Component {...props}>{content}</Component> : <div>Component {component} not found</div>)}
            </div>

            <SxoCodeGroup>
                <SxoCodeBlock framework="vue">
                    <pre className="p-4 text-xs overflow-auto bg-neutral-50 dark:bg-neutral-900 text-gray-700 dark:text-gray-300">
                        <code>{generateCode('vue')}</code>
                    </pre>
                </SxoCodeBlock>
                <SxoCodeBlock framework="react">
                    <pre className="p-4 text-xs overflow-auto bg-neutral-50 dark:bg-neutral-900 text-gray-700 dark:text-gray-300">
                        <code>{generateCode('react')}</code>
                    </pre>
                </SxoCodeBlock>
            </SxoCodeGroup>
        </div>
    );
};
