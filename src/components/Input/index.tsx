import { Field, ErrorMessage } from "formik";
import { InputHTMLAttributes } from "react";

interface PropTypes extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: string;
    label: string;
    required?: boolean;
  }
  
export function Input({ name, type = "", label, required, ...props }: PropTypes) {
    return (
        <div>
            <label>
                {label}
                {required && <label>*</label>}
            </label>
            <Field className="w-full h-10 px-2 rounded-md bg-light-tertiary" type={type} name={name} />
            <ErrorMessage name={name} component="span"/>
        </div>        
    );
}
