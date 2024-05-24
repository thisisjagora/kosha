import { HTMLAttributes, forwardRef, useState } from "react";
import { Input, InputProps } from "../input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Row } from "../layout";

interface PasswordInputProps extends InputProps {
      hideToggle?: boolean;
      container?: HTMLAttributes<HTMLDivElement>
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
      function PasswordInput_({ hideToggle = false, container, ...props }, ref) {
            const [showPassword, setShowPassword] = useState<boolean>(false);
            return (
                  <Row {...container} className={cn("items-center h-14 py-1 pl-1 pr-2 w-full rounded-xl border border-input bg-background text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", container?.className)}>
                        <Input 
                              {...props}
                              ref={ref}
                              className={cn("px-0 pl-5 h-full border-0 outline-none focus-visible:ring-input focus-visible:ring-0", props.className)} 
                              type={showPassword? "text" : "password"}
                        />
                        {
					hideToggle ? null : (
						<button
							aria-label={
								showPassword ? "Hide password" : "Show password"
							}
							className="mr-2 p-1 rounded-lg inline-flex items-center justify-center outline-none focus:bg-primary-foreground hover:bg-primary-foreground aspect-square w-[30px]"
							data-state={showPassword ? "visible" : "hidden"}
							onClick={() => setShowPassword(!showPassword)}
							type="button"
						>
							{showPassword ? (
								<Eye height={20} width={20} />
							) : (
								<EyeOff height={20} width={20} />
							)}
						</button>
					)
				}
                  </Row>
            )
      }
)