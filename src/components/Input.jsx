import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
	{ label, type = "text", className = "", ...props },
	ref,
) {
	const id = useId();
	return (
		<div className="w-full">
			{label && (
				<label className="block" htmlFor={id}>
					<span className="block text-sm font-medium text-slate-700">
						{label}
					</span>
				</label>
			)}
			<input
				type={type}
				className={`peer mt-1 block w-full px-3 py-2 bg-white text-slate-400 border border-slate-300 rounded-md text-sm shadow=sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${className}`}
				ref={ref}
				id={id}
				{...props}
			/>
			<p className="mt-2 invisible peer-invalid:visible text-sm text-pink-600">
				Please provide a valid email address
			</p>
		</div>
	);
});

export default Input;
