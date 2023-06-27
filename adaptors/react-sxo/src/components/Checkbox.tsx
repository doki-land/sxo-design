import { useCheckbox } from "@sxo/design";
import { type CheckboxOptions, getCheckboxClasses } from "@sxo/ui";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { useStyle } from "../hooks.ts";

interface CheckboxGroupContextValue {
	value: any[];
	toggleValue: (value: any) => void;
	size?: "sm" | "md" | "lg";
	color?: "primary" | "success";
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
	null,
);

export interface CheckboxGroupProps {
	value?: any[];
	defaultValue?: any[];
	onChange?: (value: any[]) => void;
	direction?: "row" | "col";
	gap?: string | number;
	size?: "sm" | "md" | "lg";
	color?: "primary" | "success";
	children: React.ReactNode;
	className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
	value: controlledValue,
	defaultValue = [],
	onChange,
	direction = "col",
	gap = 2,
	size = "md",
	color = "primary",
	children,
	className = "",
}) => {
	const [internalValue, setInternalValue] = useState(defaultValue);
	const isControlled = controlledValue !== undefined;
	const currentValue = isControlled ? controlledValue : internalValue;

	const toggleValue = (val: any) => {
		const nextValue = currentValue.includes(val)
			? currentValue.filter((v) => v !== val)
			: [...currentValue, val];

		if (!isControlled) {
			setInternalValue(nextValue);
		}
		onChange?.(nextValue);
	};

	return (
		<CheckboxGroupContext.Provider
			value={{ value: currentValue, toggleValue, size, color }}
		>
			<div className={`flex flex-${direction} gap-${gap} ${className}`.trim()}>
				{children}
			</div>
		</CheckboxGroupContext.Provider>
	);
};

export interface CheckboxProps extends CheckboxOptions {
	checked?: boolean;
	defaultChecked?: boolean;
	value?: any;
	disabled?: boolean;
	onChange?: (checked: boolean) => void;
	children?: React.ReactNode;
	className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	checked: controlledChecked,
	defaultChecked = false,
	value: itemValue,
	disabled = false,
	onChange,
	size: propsSize,
	color: propsColor,
	children,
	className = "",
}) => {
	const context = useContext(CheckboxGroupContext);

	const [internalChecked, setInternalChecked] = useState(defaultChecked);
	const isControlled = controlledChecked !== undefined;

	const currentChecked = context
		? context.value.includes(itemValue)
		: isControlled
			? controlledChecked
			: internalChecked;

	const size = propsSize || context?.size || "md";
	const color = propsColor || context?.color || "primary";

	const { getInputProps, getLabelProps } = useCheckbox({
		defaultChecked: currentChecked,
		disabled,
	});
	const classes = getCheckboxClasses(currentChecked, {
		size,
		color,
		disabled,
	});

	useStyle([classes.root, classes.icon, className].filter(Boolean).join(" "));

	const handleToggle = () => {
		if (disabled) return;
		const nextValue = !currentChecked;
		if (context && itemValue !== undefined) {
			context.toggleValue(itemValue);
		} else if (!isControlled) {
			setInternalChecked(nextValue);
		}
		onChange?.(nextValue);
	};

	return (
		<label
			{...getLabelProps()}
			className={`inline-flex items-center gap-2 cursor-pointer ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			} ${className}`.trim()}
		>
			<div className={classes.root} onClick={handleToggle}>
				<input {...getInputProps()} className="sr-only" readOnly />
				<svg
					className={classes.icon}
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="2 6 5 9 10 3" />
				</svg>
			</div>
			{children && <span className="text-sm select-none">{children}</span>}
		</label>
	);
};
