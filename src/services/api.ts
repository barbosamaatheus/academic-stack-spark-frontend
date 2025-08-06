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
  username: string;
  email: string;
  reputation: number;
  createdAt: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  author: User;
  votes: number;
  answered: boolean;
  answerCount: number;
  createdAt: string;
  updatedAt: string;
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
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Serviços de Perguntas
export const questionService = {
  getAll: async (): Promise<Question[]> => {
    const response = await api.get('/questions');
    return response.data;
  },

  getById: async (id: number): Promise<Question> => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  },

  create: async (questionData: Partial<Question>): Promise<Question> => {
    const response = await api.post('/questions', questionData);
    return response.data;
  },

  update: async (id: number, questionData: Partial<Question>): Promise<Question> => {
    const response = await api.put(`/questions/${id}`, questionData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/questions/${id}`);
  },

  getByUser: async (userId: number): Promise<Question[]> => {
    const response = await api.get(`/users/${userId}/questions`);
    return response.data;
  },
};

// Serviços de Respostas
export const answerService = {
  getByQuestion: async (questionId: number): Promise<Answer[]> => {
    const response = await api.get(`/questions/${questionId}/answers`);
    return response.data;
  },

  create: async (questionId: number, content: string): Promise<Answer> => {
    const response = await api.post(`/questions/${questionId}/answers`, { content });
    return response.data;
  },

  update: async (id: number, content: string): Promise<Answer> => {
    const response = await api.put(`/answers/${id}`, { content });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/answers/${id}`);
  },

  markAsAccepted: async (id: number): Promise<Answer> => {
    const response = await api.put(`/answers/${id}/accept`);
    return response.data;
  },

  getByUser: async (userId: number): Promise<Answer[]> => {
    const response = await api.get(`/users/${userId}/answers`);
    return response.data;
  },
};

// Serviços de Votos
export const voteService = {
  voteQuestion: async (questionId: number, type: 'upvote' | 'downvote'): Promise<void> => {
    await api.post(`/questions/${questionId}/vote`, { type });
  },

  voteAnswer: async (answerId: number, type: 'upvote' | 'downvote'): Promise<void> => {
    await api.post(`/answers/${answerId}/vote`, { type });
  },

  removeVote: async (questionId?: number, answerId?: number): Promise<void> => {
    if (questionId) {
      await api.delete(`/questions/${questionId}/vote`);
    } else if (answerId) {
      await api.delete(`/answers/${answerId}/vote`);
    }
  },
};

// Serviços de Comentários
export const commentService = {
  getByQuestion: async (questionId: number): Promise<Comment[]> => {
    const response = await api.get(`/questions/${questionId}/comments`);
    return response.data;
  },

  getByAnswer: async (answerId: number): Promise<Comment[]> => {
    const response = await api.get(`/answers/${answerId}/comments`);
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