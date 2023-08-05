import { Field, ErrorMessage } from "formik";

interface PropTypes {
    name: string;
    type: string;
    label: string;
    required?: boolean;
}
  
export function Input({ name, type = "", label, required }: PropTypes) {
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
