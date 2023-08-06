import { Field } from "formik";

type OptionsProps = {
    id: string | number;
    name: string;
}

interface PropTypes {
    name: string;
    label: string;
    array: OptionsProps[];
    error?: string;
    required?: boolean;
}
  
export function Select({ name, label, array, error, required }: PropTypes) {
    return (
        <div>
            <label>
                {label}
                {required && <label>*</label>}
            </label>
            <Field as="select" className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]" name={name}>
                <option value="" disabled>Selecione um livro</option>
                {array.map((element) => (
                    <option key={element.id} value={element.id}>{element.name}</option>
                ))}
            </Field>
            {error ? <p>{error}</p> : <div className="h-5"></div>}
        </div>        
    );
}
