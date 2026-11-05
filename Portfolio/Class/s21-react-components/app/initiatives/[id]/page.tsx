'use client';
import {useState} from 'react';
import {SAMPLE_INITIATIVES} from '../../data/initiatives';
import {useParams, useRouter} from 'next/navigation';

const InitiativePage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [bookmarked, setBookmarked] = useState(false);

  const initiative = SAMPLE_INITIATIVES.find((initiative) => initiative.id === id);

    if (!initiative) {
        return(
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold text-red-500">Initiative not found</h1>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-md"
                >
                    Back to Initiatives
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{initiative.title}</h1>
            <p className="mb-2"><strong>Category:</strong> {initiative.category}</p>
            <p className="mb-2"><strong>Votes:</strong> {initiative.votes}</p>
            <p className="mb-4"><strong>Description:</strong> {initiative.description}</p>
            <p className="mb-4"><strong>Author:</strong> {initiative.author}</p>
            <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`px-4 py-2 rounded-md ${bookmarked ? 'bg-yellow-500 text-white' : 'bg-zinc-800 text-white'}`}
            >
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
        </div>
    );

};
export default InitiativePage;