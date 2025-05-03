import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
	return (
		<section className="w-full h-full bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 p-0">
			<div className=" h-full relative">{children}</div>
			<Toaster position="top-right" />
		</section>
	);
}
