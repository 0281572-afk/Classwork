'use client';
import Link from 'next/link';

interface CardProps {
  id: string;
  title: string;
  votes: number;
  onVote: (id: string) => void;
}

const InitiativeCard = ({ id, title, votes, onVote }: CardProps) => {
    return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white dark:bg-zinc-900 flex flex-col justify-between">
      <div>
        <Link href={`/initiatives/${id}`}>
          <h3 className="text-xl font-semibold hover:underline text-emerald-600 dark:text-emerald-400">
            {title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Votes: <span className="font-bold text-zinc-900 dark:text-zinc-100">{votes}</span>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => onVote(id)}
          className="px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition"
        >
          Vote
        </button>
        <Link
          href={`/initiatives/${id}`}
          className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default InitiativeCard;