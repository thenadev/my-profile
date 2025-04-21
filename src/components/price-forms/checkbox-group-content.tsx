import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxOption {
  id: string;
  title: string;
  price: number;
  description?: string;
  monthly?: boolean;
  checked?: boolean;
}

interface CheckboxGroupContentProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  options: CheckboxOption[];
}

export const CheckboxGroupContent = ({
  value,
  onValueChange,
  options,
}: CheckboxGroupContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => {
              const newChecked = !value.includes(option.id);
              if (newChecked) {
                onValueChange([...value, option.id]);
              } else {
                onValueChange(value.filter((f) => f !== option.id));
              }
            }}
          >
            <Checkbox id={option.id} checked={value.includes(option.id)} />
            <div className="flex flex-col">
              <Label className="font-medium" htmlFor={option.id}>
                {option.title}
              </Label>
              <span className="text-sm text-gray-500">
                €{option.price}
                {option.monthly && " / Monat"}
              </span>
              {option.description && (
                <span className="text-sm text-gray-500 mt-1">
                  {option.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
