import { Label } from '@radix-ui/react-label';
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from './ui';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type InputProps = {
    id: string;
    value: string;
    label: string;
    handleChange: (date: Date | undefined) => void;
};

const FormRow = ({ id, value, label, handleChange }: InputProps) => {
    return (
        <div className='grid gap-3'>
            <Label className='capitalize text-sm' htmlFor={id}>
                {label}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={'outline'} className={cn('justify-start text-left font-normal', !value && 'text-muted-foreground')}>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {value ? format(new Date(value), 'PPP') : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                    <Calendar
                        mode='single'
                        selected={new Date(value)}
                        onSelect={(date: Date | undefined) => handleChange(date || undefined)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FormRow;
