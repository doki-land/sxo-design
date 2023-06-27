import { useForm, type ValidationRule } from '@sxo/design';
import React, { createContext, useContext, useEffect, useState } from 'react';

const FormContext = createContext<any>(null);

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    initialValues: Record<string, any>;
    rules?: Record<string, ValidationRule[]>;
    onSubmit?: (values: Record<string, any>) => void;
}

export const Form: React.FC<FormProps> = ({
    initialValues,
    rules = {},
    onSubmit,
    children,
    ...props
}) => {
    const form = useForm({
        initialValues,
        rules,
        onSubmit: (values) => onSubmit?.(values),
    });

    const [state, setState] = useState({
        values: { ...initialValues },
        errors: {} as Record<string, string>,
    });

    useEffect(() => {
        const unsubscribe = form.subscribe(() => {
            setState({
                values: { ...form.values },
                errors: { ...form.errors } as any,
            });
        });
        return () => unsubscribe();
    }, [form]);

    return (
        <FormContext.Provider
            value={{
                values: state.values,
                errors: state.errors,
                setFieldValue: form.setFieldValue,
            }}
        >
            <form {...props} onSubmit={form.handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

export interface FormItemProps {
    name?: string;
    label?: string;
    children?: React.ReactNode;
}

export const FormItem: React.FC<FormItemProps> = ({ name, label, children }) => {
    const form = useContext(FormContext);
    if (!form) throw new Error('FormItem must be used within Form');

    return (
        <div className="flex flex-col gap-1 mb-4">
            {label && <label className="text-sm font-bold opacity-70">{label}</label>}
            {children}
            {name && form.errors[name] && (
                <span className="text-xs text-error font-medium">{form.errors[name]}</span>
            )}
        </div>
    );
};

export function useFormContext() {
    return useContext(FormContext);
}
