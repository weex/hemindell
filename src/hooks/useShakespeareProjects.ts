import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { ShakespeareProject, CreateProjectData, UpdateProjectData } from '@/types/shakespeare';

const STORAGE_KEY = 'shakespeare-projects';

export function useShakespeareProjects() {
  const [projects, setProjects] = useLocalStorage<ShakespeareProject[]>(STORAGE_KEY, []);

  const createProject = useCallback((data: CreateProjectData): ShakespeareProject => {
    const now = new Date().toISOString();
    const newProject: ShakespeareProject = {
      id: crypto.randomUUID(),
      name: data.name,
      initialPrompt: data.initialPrompt,
      generalNotes: data.generalNotes || '',
      textIds: data.textIds || [],
      githubUrl: data.githubUrl || '',
      publishingUrl: data.publishingUrl || '',
      createdAt: now,
      updatedAt: now,
    };

    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, [setProjects]);

  const updateProject = useCallback((data: UpdateProjectData): ShakespeareProject | null => {
    let updatedProject: ShakespeareProject | null = null;
    
    setProjects(prev => prev.map(project => {
      if (project.id === data.id) {
        updatedProject = {
          ...project,
          ...data,
          updatedAt: new Date().toISOString(),
        };
        return updatedProject;
      }
      return project;
    }));

    return updatedProject;
  }, [setProjects]);

  const deleteProject = useCallback((id: string): boolean => {
    let deleted = false;
    setProjects(prev => {
      const filtered = prev.filter(project => project.id !== id);
      deleted = filtered.length !== prev.length;
      return filtered;
    });
    return deleted;
  }, [setProjects]);

  const getProject = useCallback((id: string): ShakespeareProject | undefined => {
    return projects.find(project => project.id === id);
  }, [projects]);

  const addTextId = useCallback((projectId: string, textId: string): boolean => {
    let updated = false;
    setProjects(prev => prev.map(project => {
      if (project.id === projectId && !project.textIds.includes(textId)) {
        updated = true;
        return {
          ...project,
          textIds: [...project.textIds, textId],
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    }));
    return updated;
  }, [setProjects]);

  const removeTextId = useCallback((projectId: string, textId: string): boolean => {
    let updated = false;
    setProjects(prev => prev.map(project => {
      if (project.id === projectId && project.textIds.includes(textId)) {
        updated = true;
        return {
          ...project,
          textIds: project.textIds.filter(id => id !== textId),
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    }));
    return updated;
  }, [setProjects]);

  return {
    projects,
    createProject,
    updateProject,
    deleteProject,
    getProject,
    addTextId,
    removeTextId,
  };
}