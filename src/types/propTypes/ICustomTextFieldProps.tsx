export interface ICustomTextFieldProps {
  defaultValue: any,
  onChange: (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  label: string,
  type?: string,
  inputProps?: {min?: number, max?: number, maxLength?: number}
}