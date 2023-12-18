import SectionHeading from "./Section.Heading";
import { useSectionInView } from "./../lib/hooks";
import SubmitButton from "./SubmitButton";
import React, { useRef, useState } from "react";
import { sendEmail } from "./../lib/hooks";
import toast from "react-hot-toast";

function Contact() {
	const { ref } = useSectionInView("Contact", 0.5);
	const form = useRef();
	const [isSending, setIdSending] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIdSending((prev) => !prev);
			const res = await sendEmail(form.current);
			setTimeout(() => {
				toast.success("¡Mensaje enviado con éxito!");
				setIdSending((prev) => !prev);
				for(let i=0; e.target.elements.length >i; i++) {
					e.target.elements[i].value=''
				}
			}, 1000);
		} catch (error) {
			toast.error(`${error.message}`);
		}
	};

	return (
		<section
			id="contact"
			ref={ref}
			className=" pb-10 px-4 md:px-12 sm:px-10 lg:px-32 xl:px-80 2xl:px-[30rem] text-center justify-center flex-col"
		>
			<SectionHeading>Contacto</SectionHeading>

			<p className="text-gray-700 -mt-6 dark:text-white/80">
				Puedes contactarme directamente a{" "}
				<a className="underline" href="mailto:salvatierra.nahuel@gmail.com">
					salvatierra.nahuel@gmail.com
				</a>{" "}
				o completando el formulario
			</p>

			<form
				className="mt-8 flex flex-col dark:text-black"
				onSubmit={handleSubmit}
				ref={form}
			>
				<input
					className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
					name="senderEmail"
					type="email"
					required
					maxLength={500}
					placeholder="Email"
				/>
				<textarea
					className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
					name="message"
					placeholder="Mensaje"
					required
					maxLength={5000}
				/>
				<SubmitButton pending={isSending} />
			</form>
		</section>
	);
}

export default Contact;
