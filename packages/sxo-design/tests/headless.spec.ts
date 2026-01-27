import { describe, expect, it, vi } from 'vitest';
import { useForm } from '../src/headless';

describe('useForm', () => {
    it('should initialize with initial values', () => {
        const initialValues = { username: 'testuser' };
        const onSubmit = vi.fn();
        const form = useForm({ initialValues, onSubmit });

        expect(form.values).toEqual(initialValues);
        expect(form.errors).toEqual({});
    });

    it('should validate required fields', async () => {
        const initialValues = { username: '' };
        const rules = {
            username: [{ required: true, message: 'Username is required' }],
        };
        const onSubmit = vi.fn();
        const form = useForm({ initialValues, rules, onSubmit });

        await form.handleSubmit();

        expect(form.errors.username).toBe('Username is required');
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should submit when valid', async () => {
        const initialValues = { username: 'testuser' };
        const rules = {
            username: [{ required: true, message: 'Username is required' }],
        };
        const onSubmit = vi.fn();
        const form = useForm({ initialValues, rules, onSubmit });

        await form.handleSubmit();

        expect(form.errors.username).toBeUndefined();
        expect(onSubmit).toHaveBeenCalledWith(initialValues);
    });

    it('should update field value and validate', async () => {
        const initialValues = { username: '' };
        const rules = {
            username: [{ required: true, message: 'Username is required' }],
        };
        const onSubmit = vi.fn();
        const form = useForm({ initialValues, rules, onSubmit });

        await form.setFieldValue('username', 'newuser');

        expect(form.values.username).toBe('newuser');
        expect(form.errors.username).toBeUndefined();
    });
});
