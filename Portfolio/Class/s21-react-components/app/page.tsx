'use client';
import InitiativeCard from '@/components/InitiativeCard';
import { useState } from 'react';
import { SAMPLE_INITIATIVES, Initiative } from './data/initiatives';

const Home = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>(SAMPLE_INITIATIVES);

  const handleVote = (id: string) => {
    setInitiatives(prevInitiatives =>
      prevInitiatives.map(initiative =>
        initiative.id === id ? { ...initiative, votes: initiative.votes + 1 } : initiative
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Initiatives</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initiatives.map(initiative => (
          <InitiativeCard
            key={initiative.id}
            id={initiative.id}
            title={initiative.title}
            votes={initiative.votes}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;