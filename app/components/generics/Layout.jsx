import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
	return (
		<section className="w-full bg-body dark:bg-body-dark h-full text-gray-950 dark:text-gray-50 p-0">
			<div className=" h-full relative">{children}</div>
			<Toaster position="top-right" />
		</section>
	);
}
