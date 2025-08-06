import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { voteService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface VoteButtonsProps {
  questionId?: number;
  answerId?: number;
  initialVotes: number;
  userVote?: 'upvote' | 'downvote' | null;
  onVoteChange?: (newVotes: number) => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  questionId,
  answerId,
  initialVotes,
  userVote = null,
  onVoteChange,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState<'upvote' | 'downvote' | null>(userVote);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleVote = async (type: 'upvote' | 'downvote') => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para votar.",
        variant: "destructive",
      });
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      let newVotes = votes;
      let newVote: 'upvote' | 'downvote' | null = type;

      // Se já votou no mesmo tipo, remove o voto
      if (currentVote === type) {
        if (questionId) {
          await voteService.removeVote(questionId);
        } else if (answerId) {
          await voteService.removeVote(undefined, answerId);
        }
        newVotes = votes + (currentVote === 'upvote' ? -1 : 1);
        newVote = null;
      } else {
        // Se votou diferente antes, ajusta a diferença
        if (currentVote) {
          newVotes = votes + (currentVote === 'upvote' ? -1 : 1);
        }

        // Aplica o novo voto
        if (questionId) {
          await voteService.voteQuestion(questionId, type);
        } else if (answerId) {
          await voteService.voteAnswer(answerId, type);
        }
        
        newVotes += (type === 'upvote' ? 1 : -1);
      }

      setVotes(newVotes);
      setCurrentVote(newVote);
      onVoteChange?.(newVotes);

      toast({
        title: newVote ? "Voto registrado" : "Voto removido",
        description: newVote 
          ? `Você ${type === 'upvote' ? 'curtiu' : 'não curtiu'} esta ${questionId ? 'pergunta' : 'resposta'}.`
          : "Seu voto foi removido.",
      });
    } catch (error) {
      console.error('Erro ao votar:', error);
      toast({
        title: "Erro ao votar",
        description: "Não foi possível registrar seu voto. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('upvote')}
        disabled={isLoading}
        className={`p-2 hover:bg-upvote/10 ${
          currentVote === 'upvote' 
            ? 'text-upvote bg-upvote/10' 
            : 'text-muted-foreground hover:text-upvote'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
      
      <span className={`font-semibold text-lg ${
        currentVote === 'upvote' ? 'text-upvote' : 
        currentVote === 'downvote' ? 'text-downvote' : 
        'text-foreground'
      }`}>
        {votes}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('downvote')}
        disabled={isLoading}
        className={`p-2 hover:bg-downvote/10 ${
          currentVote === 'downvote' 
            ? 'text-downvote bg-downvote/10' 
            : 'text-muted-foreground hover:text-downvote'
        }`}
      >
        <ArrowDown className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default VoteButtons;