import { Compare } from "@/components/ui/compare";

type CodeCompareProps = {
  isActive: boolean;
};

export default function CodeCompare({ isActive }: CodeCompareProps) {
  return (
    <Compare
      firstImage="/BadCode.png"
      secondImage="/GoodCode.png"
      firstImageClassName="object-cover object-left-top w-full"
      secondImageClassname="object-cover object-left-top w-full"
      className="w-full h-full rounded-[22px] md:rounded-lg"
      slideMode="hover"
      autoplay={true}
      autoplayActive={isActive}
      autoplayMode="to-left"
      allowUserInteraction={false}
      showHandlebar={false}
    />
  );
}
