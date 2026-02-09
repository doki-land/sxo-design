import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">
                SXO Design System
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                A modern, modular, cross-framework design system engine. 
                Now powered by Vite with React.
            </p>
            <div className="flex justify-center gap-4">
                <Link to="/zh-CN/guide/getting-started" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                    开始使用
                </Link>
                <a href="https://github.com/sxo-ui/sxo" className="px-8 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition">
                    GitHub
                </a>
            </div>
        </div>
    );
};

export default Home;
