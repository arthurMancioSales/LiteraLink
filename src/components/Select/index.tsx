import { Field } from "formik";

export type OptionsPropsSelect = {
    id: string | number;
    name: string;
}

interface PropTypes {
    name: string;
    label: string;
    array: OptionsPropsSelect[];
    error?: string;
    value?: (e: React.ChangeEvent<any>) => void;
    required?: boolean;
}
  
export function Select({ name, label, array, error, value, required }: PropTypes) {
    return (
        <div>
            <label>
                {label}
                {required && <label>*</label>}
            </label>
            <Field as="select" className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]" name={name} onChange={value}>
                <option value="" disabled>Selecione um livro</option>
                {array.map((element) => (
                    <option key={element.id} value={element.id}>{element.name}</option>
                ))}
            </Field>
            <div className="mt-[2px] min-h-[21px]">
                {error && (<span className="text-status-error">{error}</span>)}
            </div>
        </div>        
    );
}
