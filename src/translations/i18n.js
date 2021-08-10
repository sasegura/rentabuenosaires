import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
i18n
	// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(Backend)

	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		// we init with resources
		resources: {
			en,
			es,
		},
		fallbackLng: 'es',
		debug: true,

		// have a common namespace used around the full app
		ns: ['translations'],
		defaultNS: 'translations',

		keySeparator: false, // we use content as keys

		interpolation: {
			escapeValue: false, // not needed for react!!
			formatSeparator: ',',
		},

		react: {
			useSuspense: false,
		},
	});

export default i18n;
