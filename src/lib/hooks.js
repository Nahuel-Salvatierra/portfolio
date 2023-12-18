import { useActiveSectionContext } from "../context/activeSectionProvider";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";

export async function sendEmail(form) {
	emailjs
		.sendForm(
			"service_hcw7sbh",
			"template_7ekjmar",
			form,
			"LUEnHZHjswyccM6Yv"
		)
		.then(
			(result) => {
				return result;
			},
			(error) => {
				throw error;
			}
		);
}

export function useSectionInView(sectionName, threshold = 0.75) {
	const { ref, inView } = useInView({
		threshold,
	});
	const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

	useEffect(() => {
		if (inView && Date.now() - timeOfLastClick > 1000) {
			setActiveSection(sectionName);
		}
	}, [inView, setActiveSection, timeOfLastClick, sectionName]);

	return {
		ref,
	};
}

export function useSendEmail() {
	useEffect(() => {
		const send = async () => {};
	});
}
