import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaretSortIcon, Cross1Icon } from "@radix-ui/react-icons";
import _ from "lodash";

interface MyComponentProps {
  placeholder: string;
  options: any;
  triggerStyles: any;
  contentStyles?: any;
  customOnChange?: any;
  value?: string;
  icon?: any;
  disabled?: boolean;
  clearFunction?: any;
  isCancelable?: boolean;
  tabIndex?: number;
}

export default function NewCustomSelect({
  placeholder,
  options,
  triggerStyles,
  contentStyles,
  customOnChange,
  icon,
  value,
  disabled,
  clearFunction,
  isCancelable,
  tabIndex,
}: MyComponentProps) {
  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={(e) => customOnChange(e)}
    >
      <SelectTrigger
        className={triggerStyles}
        tabIndex={tabIndex ? tabIndex : 0}
      >
        <SelectValue placeholder={placeholder}>
          {icon && <span className="mr-2">{icon}</span>}
          <span>{options?.find((d: any) => d?.value === value)?.label}</span>
        </SelectValue>
        {!_.isEmpty(value) ? (
          isCancelable ? (
            <div className="pl-1" style={{ pointerEvents: "auto" }}>
              <Cross1Icon
                className="h-3 w-3 opacity-50"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  clearFunction();
                }}
              />
            </div>
          ) : (
            <CaretSortIcon className="h-4 w-4 opacity-50" />
          )
        ) : (
          <CaretSortIcon className="h-4 w-4 opacity-50" />
        )}
      </SelectTrigger>
      <SelectContent className={contentStyles}>
        {options?.map((option: any) => (
          <SelectItem key={option?.value} value={option?.value}>
            <div className="flex items-center gap-2 ">
              {option?.icon && <span className="mr-2">{option?.icon}</span>}
              {option?.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
