import { Field } from "formik";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AiOutlineQuestion } from "react-icons/ai";

interface PropTypes {
    name: string;
    type: string;
    label?: string;
    error?: string;
    required?: boolean;
    haveTooltip?: boolean;
    tooltipText?: string
}
  
export function Input({ name, type = "", label, error, required, haveTooltip, tooltipText }: PropTypes) {
    return (
        <div>
            <div className="flex justify-between items-center">
                <label className="dark:text-dark-text" htmlFor={name}>
                    {label}
                    {required && <label className="text-status-error">*</label>}
                </label>
                {haveTooltip && (
                    <Tooltip.Provider>
                        <Tooltip.Root
                            delayDuration={10}
                        >
                            <Tooltip.Trigger asChild>
                                <button className="text-light-text shadow-blackA7 hover:bg-brand inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                                    <AiOutlineQuestion size={12}></AiOutlineQuestion>
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-1 py-1 text-[15px] leading-none will-change-[transform,opacity] z-50 outline-1 outline w-32"
                                    sideOffset={5}
                                >
                                    {tooltipText}
                                    <Tooltip.Arrow className="fill-white" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                )}
            </div>
            <Field className="w-full h-10 px-2 rounded-md bg-light-tertiary drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)] dark:bg-dark-secondary dark:text-dark-text" type={type} name={name} id={name} />
            <div className="mt-[2px] min-h-[21px]">
                {error && (<span className="text-status-error">{error}</span>)}
            </div>
        </div>        
    );
}
