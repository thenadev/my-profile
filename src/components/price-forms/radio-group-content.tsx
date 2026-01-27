import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  id: string;
  title: string;
  price: number;
}

interface RadioGroupContentProps {
  value: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
}

export const RadioGroupContent = ({
  value,
  onValueChange,
  options,
  className = "",
}: RadioGroupContentProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}
    >
      {options.map((option) => (
        <div
          key={option.id}
          className="relative flex items-center p-4 rounded-lg border-2 border-turquoise-600/30 hover:border-turquoise-500 transition-colors cursor-pointer"
          onClick={() => {
            const radio = document.getElementById(
              option.id
            ) as HTMLInputElement;
            if (radio) radio.click();
          }}
        >
          <RadioGroupItem
            value={option.id}
            id={option.id}
            className="absolute left-4"
          />
          <div className="ml-8">
            <Label htmlFor={option.id} className="font-medium text-lg block">
              {option.title}
            </Label>
            <span className="text-blue-600 font-bold block mt-1">
              {option.price} €
            </span>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};
