export function getBackTopClasses() {
    return {
        container: [
            'fixed bottom-10 right-10 z-[300]',
            'w-12 h-12 rounded-xl bg-white border border-neutral-200 shadow-xl flex items-center justify-center',
            'text-neutral-500 hover:text-primary-DEFAULT hover:border-primary-DEFAULT hover:scale-110 active:scale-95 transition-all cursor-pointer',
        ].join(' '),
        icon: 'w-6 h-6',
    };
}
