import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export const getStaticProps = async () => {
  const resulting = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_API_URL}/podcasts?populate=cover_image`
  )
  const result = await resulting.json()
  return {
    props: {
      result: result.data,
    },
  }
}

export default function Podcasts({ result }) {
  return (
    <>
      <Head>
        <title>{`JSON's Favorite Podcasts`}</title>
        <meta
          title="description"
          content="This is an example of our podcast"
        ></meta>
      </Head>

      <div>
        <h1>Podcasts</h1>
        <div>
          {result.map((result) => {
            return (
              <div key={result.id}>
                <Link href={`/podcasts/${result.id}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CMS_URL}${result.attributes.cover_image.data.attributes.url}`}
                    alt="podcast"
                    priority={true}
                    width={300}
                    height={300}
                  />
                  <h2>{result.attributes.title}</h2>
                  <div>
                    <p>{result.attributes.description}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
