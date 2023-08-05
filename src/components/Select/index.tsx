import { Field, ErrorMessage } from "formik";

type OptionsProps = {
    id: string | number;
    name: string;
}

interface PropTypes {
    name: string;
    label: string;
    array: OptionsProps[];
    required?: boolean;
}
  
export function Select({ name, label, array, required }: PropTypes) {
    return (
        <div>
            <label>
                {label}
                {required && <label>*</label>}
            </label>
            <Field as="select" className="w-full h-10 px-2 rounded-md bg-light-tertiary" name={name}>
                <option value="" disabled>Selecione um livro</option>
                {array.map((element) => (
                    <option key={element.id} value={element.id}>{element.name}</option>
                ))}
            </Field>
            <ErrorMessage name={name} component="span"/>
        </div>        
    );
}
