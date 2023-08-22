import { Field, ErrorMessage } from "formik";

interface PropTypes {
    name: string;
    type: string;
    label?: string;
    required?: boolean;
}
  
export function TextArea({ name, type = "", label, required }: PropTypes) {
    return (
        <div>
            <label htmlFor={name}>
                {label}
                {required && <label className="text-status-error">*</label>}
            </label>
            <Field as="textarea" className="w-full min-h-[80px] max-h-[80px] p-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text" type={type} name={name} id={name} />
            <div className="mt-[2px] min-h-[21px]">
                <ErrorMessage className="text-status-error" name={name} component="span"/>
            </div>
        </div>        
    );
}
