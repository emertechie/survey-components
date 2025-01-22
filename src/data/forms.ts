export interface BaseControl {
  title?: string;
}

export interface TextControl extends BaseControl {
  type: "text";
  multiline: boolean;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface CheckboxControl extends BaseControl {
  type: "checkbox";
  label?: string;
  required?: boolean;
}

export interface CheckboxListControl extends BaseControl {
  type: "checkbox-list";
  labels: string[];
  minChecked?: number;
  maxChecked?: number;
}

export interface RadioListControl extends BaseControl {
  type: "radio-list";
  options: RadioOption[];
  required?: boolean;
}

export interface RadioOption {
  id: string;
  label: string;
  value: string;
}

export type Control = TextControl | CheckboxControl | CheckboxListControl | RadioListControl;
export type ControlType = Control["type"];

export interface Panel {
  id: string;
  title?: string;
  controls: Control[];
}

export interface Form {
  id: string;
  panels: Panel[];
}
