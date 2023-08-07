import { Field } from "formik";

interface PropTypes {
    name: string;
    type: string;
    label: string;
    error?: string;
    required?: boolean;
}
  
export function Input({ name, type = "", label, error, required }: PropTypes) {
    return (
        <div>
            <label>
                {label}
                {required && <label className="text-status-error">*</label>}
            </label>
            <Field className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]" type={type} name={name} />
            <div className="mt-[2px] min-h-[21px]">
                {error && (<span className="text-status-error">{error}</span>)}
            </div>
        </div>        
    );
}
