import axios from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tipos de dados
export interface User {
  id: number;
  nome: string;
  email: string;
  reputation?: number;
  createdAt: string;
}

export interface Question {
  id: number;
  titulo: string;
  conteudo: string;
  autor: User;
  votos: number;
  answered: boolean;
  answerCount: number;
  dataCriacao: string;
  respostas?: Answer[];
  tags: string[];
}

export interface Answer {
  id: number;
  content: string;
  author: User;
  questionId: number;
  votes: number;
  accepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  questionId?: number;
  answerId?: number;
  createdAt: string;
}

export interface Vote {
  id: number;
  userId: number;
  questionId?: number;
  answerId?: number;
  type: 'upvote' | 'downvote';
}

// Serviços de Autenticação
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login', { email, senha: password });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/cadastrar', { nome: username, email, senha: password });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/me');
    return response.data;
  },
};

// Serviços de Perguntas
export const questionService = {
  getAll: async (): Promise<Question[]> => {
    const response = await api.get('/perguntas');
    return response.data;
  },

  getById: async (id: number): Promise<Question> => {
    const response = await api.get(`/perguntas/${id}`);
    return response.data;
  },

  create: async (questionData: Partial<Question>): Promise<Question> => {
    console.log(questionData);
    const response = await api.post('/perguntas', questionData);
    return response.data;
  },

  update: async (id: number, questionData: Partial<Question>): Promise<Question> => {
    const response = await api.put(`/perguntas/${id}`, questionData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/perguntas/${id}`);
  },

  getByUser: async (userId: number): Promise<Question[]> => {
    const response = await api.get(`/users/${userId}/perguntas`);
    return response.data;
  },
};

// Serviços de Respostas
export const answerService = {
  getByQuestion: async (questionId: number): Promise<Answer[]> => {
    const response = await api.get(`/perguntas/${questionId}/respostas`);
    return response.data;
  },

  create: async (questionId: number, content: string): Promise<Answer> => {
    const response = await api.post(`/perguntas/${questionId}/respostas`, { content });
    return response.data;
  },

  update: async (id: number, content: string): Promise<Answer> => {
    const response = await api.put(`/respostas/${id}`, { content });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/respostas/${id}`);
  },

  markAsAccepted: async (id: number): Promise<Answer> => {
    const response = await api.put(`/respostas/${id}/accept`);
    return response.data;
  },

  getByUser: async (userId: number): Promise<Answer[]> => {
    const response = await api.get(`/users/${userId}/respostas`);
    return response.data;
  },
};

// Serviços de Votos
export const voteService = {
  voteQuestion: async (questionId: number, type: 'upvote' | 'downvote'): Promise<void> => {
    await api.post(`/perguntas/${questionId}/vote`, { type });
  },

  voteAnswer: async (answerId: number, type: 'upvote' | 'downvote'): Promise<void> => {
    await api.post(`/respostas/${answerId}/vote`, { type });
  },

  removeVote: async (questionId?: number, answerId?: number): Promise<void> => {
    if (questionId) {
      await api.delete(`/perguntas/${questionId}/vote`);
    } else if (answerId) {
      await api.delete(`/respostas/${answerId}/vote`);
    }
  },
};

// Serviços de Comentários
export const commentService = {
  getByQuestion: async (questionId: number): Promise<Comment[]> => {
    const response = await api.get(`/perguntas/${questionId}/comments`);
    return response.data;
  },

  getByAnswer: async (answerId: number): Promise<Comment[]> => {
    const response = await api.get(`/respostas/${answerId}/comments`);
    return response.data;
  },

  create: async (content: string, questionId?: number, answerId?: number): Promise<Comment> => {
    const response = await api.post('/comments', { content, questionId, answerId });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/comments/${id}`);
  },
};

// Serviços de Usuários
export const userService = {
  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
};

export default api;