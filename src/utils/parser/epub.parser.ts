import {loadAsync} from 'jszip';
import xmlParser from 'fast-xml-parser';

export const epubParser = async (file: File) => {
	const files = await loadAsync(file);

	console.log(files);
};
