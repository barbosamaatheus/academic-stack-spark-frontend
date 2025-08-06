import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/services/api";
import { ArrowUp, ArrowDown, MessageSquare, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Vote and Stats Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[80px]">
          <div className="flex flex-col items-center">
            <ArrowUp className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold text-lg">{question.votes}</span>
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </div>

          <div
            className={`px-2 py-1 rounded text-sm font-medium ${
              question.answered
                ? "bg-question-answered text-upvote border border-upvote/30"
                : "bg-question-unanswered text-muted-foreground border"
            }`}
          >
            {question.answerCount}{" "}
            {question.answerCount === 1 ? "resposta" : "respostas"}
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 min-w-0">
          <Link to={`/questions/${question.id}`} className="block group">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {question.titulo}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {question.conteudo.length > 150
              ? `${question.conteudo.substring(0, 150)}...`
              : question.conteudo}
          </p>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {question.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Author and Date */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <span>por</span>
              <Link
                to={`/users/${question.autor.id}`}
                className="text-primary hover:underline font-medium"
              >
                {question.autor.nome}
              </Link>
              <span className="text-badge-gold">
                ({question.autor?.reputation})
              </span>
            </div>
            <span>{formatDate(question.dataCriacao)}</span>
          </div>
        </div>

        {/* Accepted Answer Indicator */}
        {question.answered && (
          <div className="flex items-start">
            <div className="flex items-center text-accepted">
              <Check className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuestionCard;
