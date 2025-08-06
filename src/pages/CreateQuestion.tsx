import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { questionService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, ArrowLeft } from 'lucide-react';

const CreateQuestion: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título e o conteúdo da pergunta.",
        variant: "destructive",
      });
      return;
    }

    if (title.length < 10) {
      toast({
        title: "Título muito curto",
        description: "O título deve ter pelo menos 10 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (content.length < 20) {
      toast({
        title: "Conteúdo muito curto",
        description: "O conteúdo deve ter pelo menos 20 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const questionData = {
        title: title.trim(),
        content: content.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      };

      const newQuestion = await questionService.create(questionData);
      
      toast({
        title: "Pergunta criada com sucesso!",
        description: "Sua pergunta foi publicada e já está disponível para a comunidade.",
      });
      
      navigate(`/questions/${newQuestion.id}`);
    } catch (error) {
      console.error('Erro ao criar pergunta:', error);
      toast({
        title: "Erro ao criar pergunta",
        description: "Não foi possível publicar sua pergunta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Plus className="w-8 h-8 mr-3 text-primary" />
              Fazer uma Pergunta
            </h1>
            <p className="text-muted-foreground mt-2">
              Seja específico e imagine que está perguntando para um colega
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nova Pergunta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Título da pergunta *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Ex: Como implementar herança em Java?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Seja específico e imagine que está perguntando para um colega
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  Conteúdo da pergunta *
                </Label>
                <Textarea
                  id="content"
                  placeholder="Descreva sua pergunta em detalhes. Inclua código, mensagens de erro, ou o que já tentou fazer..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  className="resize-none"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Inclua todos os detalhes relevantes para que outros possam ajudar
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">
                  Tags (opcional)
                </Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="java, programacao, heranca (separadas por vírgula)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Adicione tags para categorizar sua pergunta (máximo 5 tags)
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? 'Publicando...' : 'Publicar Pergunta'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Dicas para uma boa pergunta</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Seja específico no título</li>
              <li>Descreva o problema claramente</li>
              <li>Inclua código relevante se aplicável</li>
              <li>Mencione o que você já tentou</li>
              <li>Use tags apropriadas para categorizar</li>
              <li>Revise sua pergunta antes de publicar</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateQuestion;