"use client";

import React from "react";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputForm({ ...props }: InputFormProps) {
	return (
		<input
			{...props}
			className="w-full p-2 rounded-md border border-gray-300"
		/>
	);
}
