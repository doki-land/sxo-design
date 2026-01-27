export function useToggle(initialState = false) {
    let state = initialState;
    const listeners = new Set<(state: boolean) => void>();

    const setState = (newState: boolean) => {
        state = newState;
        for (const l of listeners) {
            l(state);
        }
    };

    return {
        get state() {
            return state;
        },
        toggle: () => setState(!state),
        setOn: () => setState(true),
        setOff: () => setState(false),
        subscribe: (listener: (state: boolean) => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        getToggleProps: () => ({
            role: 'switch',
            'aria-checked': state,
            onClick: () => setState(!state),
        }),
        getButtonProps: () => ({
            role: 'switch',
            'aria-checked': state,
            onClick: () => setState(!state),
        }),
    };
}
