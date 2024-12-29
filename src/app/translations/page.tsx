import { neon } from '@neondatabase/serverless';
import { auth } from '@clerk/nextjs/server';
import TranslationCard from '@/components/TranslationCard';

const databaseURL = process.env.DATABASE_URL || '';

async function getData(userId: string) {
  const sql = neon(databaseURL);
  const response = await sql`
    SELECT
      source_language,
      target_language,
      COUNT(*) AS translation_count,
      ARRAY_AGG(souce_text) AS souce_text,
      ARRAY_AGG(translated_text) AS translated_texts
    FROM translations
    WHERE user_id = ${userId}
    GROUP BY source_language, target_language
  `;

  // return response.map(row => ({
  //   source_language: row.source_language,
  //   target_language: row.target_language,
  //   souce_text: row.source_text,
  //   translated_texts: row.translated_texts,
  // }))
  return response;
}

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return <p>Unagle to find the user_id.</p>
  }

  const data = await getData(userId?.toString());

  return (
    <>
      <h1 className="text-3xl fond-bold text-center mb-8 text-gray-800">Translations</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((group, index) => (
          <TranslationCard
            key={index}
            group={group}
          />
        ))}
      </div>
    </>
  )
}