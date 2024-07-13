import { HTMLAttributes } from "react";

export const InputDirectives: Record<
	"numbersOnly",
	HTMLAttributes<HTMLElement>
> = {
	numbersOnly: {
		inputMode: "numeric",
		onKeyDown: (e) => {
			const target = e.target as HTMLTextAreaElement;
			if (e.code === "") return;
			if (["Backspace", "Tab"].includes(e.code)) return;
			if ((e.code || "").includes("Arrow")) return;

			if (e.key === ".") {
				e.preventDefault();
				return;
			}

			if (target.value.length === 11) {
				e.preventDefault();
				return;
			}

			if (!/\d+?/.test(e.code)) {
				e.preventDefault();
			}
		}
	}
};
