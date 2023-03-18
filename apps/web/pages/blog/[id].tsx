import Head from "next/head";
import Image from "next/image";
import fm from 'front-matter'
import {marked} from 'marked';

export const getStaticPaths = async () => {
	let result = await fetch(`http://127.0.0.1:1337/api/blogs`);
	result = await result.json();

	return {
		paths: result.data.map(result => ({
			params: { id: result.id.toString() },
		})),
		fallback: false,
	}
}

export const getStaticProps = async ({ params }) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/blogs/${params.id}?populate=cover_image`);
	const markdownWithMeta = await res.json();

	const parsedMarkdown = fm(markdownWithMeta.data.attributes.draft);
	const htmlString = marked(parsedMarkdown.body);
	const image = markdownWithMeta.data.attributes.cover_image.data.attributes.url

	return {
		props: {
			image,
			htmlString,
			data: parsedMarkdown.attributes,
		}
	}
};

export default function BlogPost({ image, htmlString, data }) {
	return (
		<>
			<Head>
				<title>{data.title}</title>
				<meta name="description" content={data.description} />
			</Head>

			<div>
				<Image
					src={`${process.env.NEXT_PUBLIC_CMS_URL}${image}`}
					alt="blog-post"
					priority={true}
					width={600}
					height={400}
				/>
				<div dangerouslySetInnerHTML={{ __html: htmlString }} />
			</div>
		</>
	);
}