import { Label } from '@radix-ui/react-label';
import { Input } from './ui';

type InputProps = {
    type: string;
    name: string;
    id: string;
    value: string;
    label: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormRowInput = ({ type, name, id, value, label, handleChange }: InputProps) => {
    return (
        <div className='grid gap-3'>
            <Label className='capitalize text-sm' htmlFor={id}>
                {label}
            </Label>
            <Input type={type} name={name} id={id} value={value} onChange={handleChange}></Input>
        </div>
    );
};

export default FormRowInput;
