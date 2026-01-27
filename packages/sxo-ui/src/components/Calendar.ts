export function getCalendarClasses() {
    return {
        container:
            'w-full bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden',
        header: 'flex items-center justify-between p-4 border-b border-neutral-50',
        headerTitle: 'text-lg font-bold text-neutral-900',
        headerActions: 'flex items-center gap-2',
        headerBtn: 'p-2 rounded-lg hover:bg-neutral-50 text-neutral-500 transition-all',
        body: 'p-4',
        weekRow: 'grid grid-cols-7 mb-2',
        weekDay: 'text-center text-xs font-bold text-neutral-400 uppercase tracking-widest py-2',
        grid: 'grid grid-cols-7 gap-1',
        day: 'aspect-square flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer relative group',
        dayCurrent: 'hover:bg-primary-50',
        dayToday: 'bg-primary-DEFAULT text-white shadow-lg shadow-primary-200 hover:bg-primary-600',
        daySelected: 'border-2 border-primary-DEFAULT',
        dayOutside: 'text-neutral-200 cursor-not-allowed',
        dayText: 'text-sm font-medium',
        dayDot: 'absolute bottom-2 w-1 h-1 rounded-full bg-primary-DEFAULT',
        dayDotToday: 'bg-white',
    };
}
