import { Slider } from "@/components/ui/slider";

interface SliderContentProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  pricePerUnit: number;
  unitLabel: string;
  className?: string;
}

export const SliderContent = ({
  value,
  onValueChange,
  min,
  max,
  step,
  pricePerUnit,
  unitLabel,
  className = "",
}: SliderContentProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <Slider
        value={[value]}
        onValueChange={(value) => onValueChange(value[0])}
        min={min}
        max={max}
        step={step}
      />
      <div className="flex justify-between">
        <span>
          {min} {unitLabel}
        </span>
        <span className="font-bold">
          Gewählt: {value} {unitLabel}
        </span>
        <span>
          {max} {unitLabel}
        </span>
      </div>
      <p className="text-sm text-gray-400">
        Jede zusätzliche {unitLabel} kostet {pricePerUnit} €
      </p>
    </div>
  );
};
