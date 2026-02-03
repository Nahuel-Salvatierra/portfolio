import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
	return (
		<section className="w-full h-full p-0">
			<div className=" h-full relative">{children}</div>
			<Toaster position="top-right" />
		</section>
	);
}
