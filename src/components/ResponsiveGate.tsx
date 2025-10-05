import { PropsWithChildren } from "react";
import { useScreenSize } from "../contexts/ScreenSizeContext";

type Props = PropsWithChildren<{
  minWidth?: number;      
  message?: string;       
}>;

export default function ResponsiveGate({ minWidth = 768, message, children }: Props) {
  const { width } = useScreenSize();
  if (width === 0) return null; 

  if (width < minWidth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-3">Screen too small</h1>
          <p className="opacity-80">
            {message ?? `This app is not optimized for small screens yet. 
            Please use a device with a larger display (≥ ${minWidth}px).`}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
