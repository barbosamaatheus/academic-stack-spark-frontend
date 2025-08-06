import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import QuestionCard from '@/components/QuestionCard';
import { Question, questionService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(question =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredQuestions(filtered);
    }
  }, [searchTerm, questions]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const data = await questionService.getAll();
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
      toast({
        title: "Erro ao carregar perguntas",
        description: "Não foi possível carregar as perguntas. Verifique se o backend está rodando.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando perguntas...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Perguntas Recentes
            </h1>
            <p className="text-muted-foreground">
              {filteredQuestions.length} {filteredQuestions.length === 1 ? 'pergunta' : 'perguntas'}
            </p>
          </div>
          
          {isAuthenticated && (
            <Link to="/ask" className="mt-4 sm:mt-0">
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Fazer Pergunta
              </Button>
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar perguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {searchTerm ? 'Nenhuma pergunta encontrada para sua busca.' : 'Nenhuma pergunta encontrada.'}
            </div>
            {isAuthenticated && !searchTerm && (
              <Link to="/ask">
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Fazer a Primeira Pergunta
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}

        {/* Call to Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <div className="mt-12 text-center bg-card p-8 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Faça parte da comunidade!</h3>
            <p className="text-muted-foreground mb-6">
              Cadastre-se para fazer perguntas, responder e ajudar outros estudantes.
            </p>
            <div className="space-x-4">
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  Cadastrar-se
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;