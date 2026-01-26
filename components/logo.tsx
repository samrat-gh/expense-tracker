import { FaMoneyCheckDollar } from "react-icons/fa6";
import { productConfig } from "@/data/config";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-fit items-center justify-center rounded-md">
        <FaMoneyCheckDollar
          className="fill-black text-purple-900 dark:fill-white dark:text-purple-500"
          size={40}
          stroke="oklch(62.7% 0.265 303.9)"
        />
      </div>
      <span className="relative font-bold light:text-purple-900 text-xl tracking-widest dark:text-purple-50">
        {productConfig.name}
      </span>
    </div>
  );
}
