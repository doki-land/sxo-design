import React, { useState } from 'react';

interface SxoCodeBlockProps {
    framework: string;
    children: React.ReactNode;
    active?: boolean;
}

export const SxoCodeBlock: React.FC<SxoCodeBlockProps> = ({ children, active }) => {
    if (!active) return null;
    return <div className="sxo-code-block">{children}</div>;
};

interface SxoCodeGroupProps {
    children: React.ReactElement<SxoCodeBlockProps>[];
}

export const SxoCodeGroup: React.FC<SxoCodeGroupProps> = ({ children }) => {
    const [activeFramework, setActiveFramework] = useState(children[0]?.props.framework || 'vue');

    return (
        <div className="sxo-code-group border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-4">
                {React.Children.map(children, (child) => {
                    const framework = child.props.framework;
                    return (
                        <button
                            onClick={() => setActiveFramework(framework)}
                            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
                                activeFramework === framework
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {framework.toUpperCase()}
                        </button>
                    );
                })}
            </div>
            <div className="p-0">
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        active: child.props.framework === activeFramework
                    });
                })}
            </div>
        </div>
    );
};
