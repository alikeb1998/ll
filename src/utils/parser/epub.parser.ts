import JSZip, {JSZipObject, loadAsync} from 'jszip';
import xmlParser from 'fast-xml-parser';

export interface BookData {
	result: JSZip;
	content: {
		meta: {
			title?: string;
			author?: string;
			publisher?: string;
		};
		items: {
			href: string;
			id: string;
			'meta-type': string;
		}[];
		chapters: {
			idref: string;
		}[];
	};
}

const getRootFile = async (file: JSZipObject | null): Promise<string> => {
	if (!file) throw new Error('Invalid Epub file.');
	const content = await file.async('string');

	const data = xmlParser.parse(content, {
		parseAttributeValue: true,
		attrNodeName: 'attr',
		textNodeName: '#text',
		ignoreNameSpace: false,
		allowBooleanAttributes: true,
		trimValues: true,
		cdataTagName: '_c',
		cdataPositionChar: '\\c',
		parseTrueNumberOnly: true,
		arrayMode: false,
		attributeNamePrefix: '',
		ignoreAttributes: false,
	});

	const rootFileData = data?.container?.rootfiles?.rootfile?.attr;

	if (!rootFileData) throw new Error('Invalid Epub file.');

	if (!rootFileData['full-path']) throw new Error('Invalid Epub file.');

	return rootFileData['full-path'];
};

const parseMetadata = (metadata: {[key: string]: any}) => {
	const title = metadata['dc:title'] as string;

	let author = metadata['dc:creator'] as string;
	if (typeof author === 'object') author = author['text'] as string;

	const publisher = metadata['dc:publisher'] as string;

	return {
		title,
		author,
		publisher,
	};
};

const parseContentData = async (contentFile: JSZipObject | null) => {
	if (!contentFile) throw new Error('Invalid Epub file.');

	const contentData = await xmlParser.parse(await contentFile.async('string'), {
		parseAttributeValue: true,
		attrNodeName: 'attr',
		textNodeName: 'text',
		ignoreNameSpace: false,
		allowBooleanAttributes: true,
		trimValues: true,
		cdataTagName: '_c',
		cdataPositionChar: '\\c',
		parseTrueNumberOnly: true,
		arrayMode: true,
		attributeNamePrefix: '',
		ignoreAttributes: false,
	});

	return {
		meta: parseMetadata(contentData.package[0].metadata[0]),
		items: contentData.package[0].manifest[0].item.map(
			({attr}: {attr: string}) => attr
		),
		chapters: contentData.package[0].spine[0].itemref.map(
			({attr}: {attr: string}) => attr
		),
	};
};

export const epubParser = async (file: File): Promise<BookData> => {
	try {
		const result = await loadAsync(file);

		const rootFilePath = await getRootFile(
			result.file('META-INF/container.xml')
		);

		const contentFile = result.file(rootFilePath);

		return {
			result,
			content: await parseContentData(contentFile),
		};
	} catch (err) {
		throw new Error('Invalid Epub file.');
	}
};
