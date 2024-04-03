import { ChangeEvent } from "react";

interface InputComponentProps {
    label?: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    componentType?: string;
}

export default function InputComponent(props: InputComponentProps) {
    const { label, placeholder, type, value, onChange, componentType } = props
    return (
        <>
            {
                componentType == 'input' ? (
                <div className="relative">
                    <p className="pt-0 pr-2 pb-0 pl-2 bg-transparent -mt-3 mr-0 mb-0 ml-2 font-medium text-black">{label}</p>
                    <input 
                        placeholder={placeholder}
                        type={type || 'text'}
                        value={value || ''}
                        onChange={onChange}
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-gray-700 border-gray-300 rounded-3xl"
                    />
                </div>
                ) : (
                    <div className="relative">
                        <textarea 
                            placeholder={placeholder}
                            value={value || ''}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
                            className="w-full rounded-md p-2 text-gray-800"
                        ></textarea>
                    </div>
                )
            }
        </>
    )
}