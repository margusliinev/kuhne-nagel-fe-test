import { Label } from '@radix-ui/react-label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';

type InputProps = {
    name: string;
    value: string;
    label: string;
    handleChange: (value: string) => void;
};

const FormRow = ({ name, value, label, handleChange }: InputProps) => {
    return (
        <div className='grid gap-3'>
            <Label className='capitalize text-sm'>{label}</Label>
            <Select name={name} value={value} onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder='Select Date' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='Pending'>Pending</SelectItem>
                    <SelectItem value='Shipped'>Shipped</SelectItem>
                    <SelectItem value='In Transit'>In Transit</SelectItem>
                    <SelectItem value='Delivered'>Delivered</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default FormRow;
