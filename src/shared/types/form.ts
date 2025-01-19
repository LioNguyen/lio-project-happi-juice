import { ReactNode } from "react";

interface IFormBase {
  className?: string;
  error?: string;
  id?: string;
  label?: string;
  onChange?: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  tooltip?: ReactNode;
  value?: any;
}

interface ISelectOption {
  label: string;
  value: any;
}

export type { IFormBase, ISelectOption };
