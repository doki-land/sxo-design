export interface ValidationRule {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    /** 自定义校验函数 */
    validator?: (value: any) => boolean | string | Promise<boolean | string>;
    message: string;
}

export function useForm<T extends Record<string, any>>(options: {
    initialValues: T;
    rules?: Record<keyof T, ValidationRule[]>;
    onSubmit: (values: T) => void;
}) {
    const values = { ...options.initialValues };
    const errors: Partial<Record<keyof T, string>> = {};
    const listeners = new Set<() => void>();

    const notify = () => {
        for (const l of listeners) {
            l();
        }
    };

    const validateField = async (name: keyof T) => {
        const fieldRules = options.rules?.[name];
        if (!fieldRules) return true;

        const value = values[name];
        for (const rule of fieldRules) {
            if (rule.required && !value) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.min && String(value).length < rule.min) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.max && String(value).length > rule.max) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.pattern && !rule.pattern.test(String(value))) {
                errors[name] = rule.message;
                return false;
            }
            if (rule.validator) {
                const result = await rule.validator(value);
                if (result === false) {
                    errors[name] = rule.message;
                    return false;
                }
                if (typeof result === 'string') {
                    errors[name] = result;
                    return false;
                }
            }
        }

        delete errors[name];
        return true;
    };

    return {
        values,
        errors,
        subscribe: (l: () => void) => {
            listeners.add(l);
            return () => {
                listeners.delete(l);
            };
        },
        setFieldValue: async (name: keyof T, value: any) => {
            values[name] = value;
            await validateField(name);
            notify();
        },
        handleSubmit: async (e?: any) => {
            if (e?.preventDefault) e.preventDefault();

            let isValid = true;
            const validationPromises = [];
            for (const key in options.rules) {
                validationPromises.push(validateField(key as keyof T));
            }

            const results = await Promise.all(validationPromises);
            isValid = results.every((res) => res === true);

            notify();
            if (isValid) {
                options.onSubmit(values);
            }
        },
    };
}
