import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaretSortIcon } from "@radix-ui/react-icons";

interface MyComponentProps {
  placeholder: string;
  options: any; // Optional prop
  styles: string;
  customOnChange: any;
  value: any;
  onBlur?: any;
}

const CustomSelect = ({
  placeholder,
  options,
  styles,
  customOnChange,
  value,
  onBlur,
}: MyComponentProps) => {
  return (
    <Select
      value={value}
      onValueChange={(e) => {
        customOnChange(e);
      }}
    >
      <SelectTrigger
        className={`${styles} flex items-center justify-between`}
        onBlur={onBlur}
      >
        <SelectValue placeholder={placeholder} />
        <CaretSortIcon className="ml-1 h-4 w-4 shrink-0 opacity-50" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: any) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
