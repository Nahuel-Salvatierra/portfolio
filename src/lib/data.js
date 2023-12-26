import mockupColormeMakeup from "./../assets/mockup-colorme-makeup.png";
import libreando from "./../assets/libreando.jpg";
export const links = [
	{
		name: "Inicio",
		hash: "#home",
	},
	{
		name: "Proyectos",
		hash: "#projects",
	},
	{
		name: "Habilidades",
		hash: "#skills",
	},
	{
		name: "Perfil",
		hash: "#about",
	},	
	{
		name: "Contacto",
		hash: "#contact",
	},
];

export const skillsData = [
	"HTML",
	"CSS",
	"JavaScript",
	"TypeScript",
	"React",
	"Node.js",
	"Nest.js",
	"Express",
	"Git",
	"Tailwind",
	"PostgreSQL",
	"TypeORM",
];

export const projectsData = [
	{
		title: "Colorme-Makeup",
		description:
			"Un portfolio profesional. En este trabajo se muestra material artístico, sin perder la oportunidad de interactuar con la persona directamente por los medios de comunicación brindados. ",
		tags: ["HTTP", "Bootstrap", "JavaScript"],
		imageUrl: mockupColormeMakeup,
		link:'https://colormemakeup.art/'
	},
	{
		title: "Equipo LibreAndo",
		description:
			"Esta página web fué un salto a nuevas tecnologías. Usando React aprendí a manipular estados y efectos, la web muestra el basto conocimiento de los profesionales y su calidad de atención. ",
		tags: ["React", "CSS", "Bootstrap", "React-Router-DOM"],
		imageUrl: libreando,
		link:'https://libreando.ar/'
	},
];
