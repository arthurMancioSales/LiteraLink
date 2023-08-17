import { AiOutlineSearch } from "react-icons/ai";
import * as Yup from "yup";
import { Button } from "../Button";
import { Field, Formik } from "formik";

type PropTypes = {
    variant?: "primary" | "secondary";
    onSearch: (value: string) => void;
};

export const SearchForm = ({onSearch}: PropTypes) => {
    const validationSchema = Yup.object({
        search: Yup.string(),
    });

    const initialValues = {
        search: ""
    };
      
    return (
        <Formik 
            onSubmit={async (values, {setSubmitting}) => {
                onSearch(values.search);

                setSubmitting(false);
            }}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {(props) => (
                <form className="w-full" onSubmit={(e) => {
                    e.preventDefault();
                    props.handleSubmit(e);
                }}>
                    <div className="flex justify-between p-1 gap-2 rounded-lg bg-light-primary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-text">
                        <Field name="search" type="search" className="bg-transparent w-full px-2" placeholder="Pesquisar uma comunidade"/>
                        <div>
                            <Button icon={<AiOutlineSearch size={25}/>} type="submit">Pesquisar</Button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};
