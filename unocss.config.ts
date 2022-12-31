import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerVariantGroup from '@unocss/transformer-variant-group'


export default defineConfig({
	theme: {
		colors: {
			"primary": "#186180",
			"primaryDark": "#074454",
			"secondary": "#43e0ae",
			"secondaryDark": "#35B58CFF",
			"dark": "hsl(220, 95%, 8%)",
			"lightDark": "hsl(219,77%,15%)",
			"light": "#142E66FF"
		}
	},
	shortcuts: [
		{
			"btn-primary": "text-sm whitespace-nowrap py-1 px-4 flex justify-center items-center bg-primary-dark hover:bg-primary focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center font-thin shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded",
			"btn-secondary": "text-sm whitespace-nowrap py-1 px-4 flex justify-center items-center bg-secondary-dark hover:bg-secondary focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center font-thin shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded",
			"btn-default": "text-sm whitespace-nowrap border py-1 px-4 flex justify-center items-center bg-gray-100 hover:bg-white text-primary-dark w-full transition ease-in duration-200 text-center font-thin rounded",
		},
		[
			'icon-btn',
			'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
		],
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
		}),
	],
	transformers: [
		transformerDirective(),
		transformerCompileClass(),
		transformerVariantGroup(),
	],
	// transformers: [
	//   transformerDirectives(),
	//   transformerVariantGroup(),
	// ],
})
