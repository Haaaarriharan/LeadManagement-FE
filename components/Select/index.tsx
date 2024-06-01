import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MyComponentProps {
  placeholder: string;
  options: any; // Optional prop
  styles: string;
  customOnChange: any;
  value: any;
}

const CustomSelect = ({
  placeholder,
  options,
  styles,
  customOnChange,
  value,
}: MyComponentProps) => {
  return (
    <Select value={value} onValueChange={(e) => customOnChange(e)}>
      <SelectTrigger className={styles}>
        <SelectValue placeholder={placeholder} />
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
