import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, BookOpen } from 'lucide-react';
import { useShakespeareProjects } from '@/hooks/useShakespeareProjects';
import { ProjectForm } from '@/components/ProjectForm';
import { ProjectCard } from '@/components/ProjectCard';
import { useToast } from '@/hooks/useToast';
import type { ShakespeareProject, CreateProjectData } from '@/types/shakespeare';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ShakespeareProject | null>(null);

  const { projects, createProject, updateProject, deleteProject } = useShakespeareProjects();
  const { toast } = useToast();

  useSeoMeta({
    title: 'Shakespeare Projects',
    description: 'Manage your Shakespeare AI projects with prompts, notes, and resources.',
  });

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.initialPrompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.generalNotes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProject = (data: CreateProjectData) => {
    try {
      createProject(data);
      setIsCreateDialogOpen(false);
      toast({
        title: 'Project created',
        description: `"${data.name}" has been created successfully.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProject = (data: CreateProjectData) => {
    if (!editingProject) return;

    try {
      updateProject({ ...data, id: editingProject.id });
      setEditingProject(null);
      toast({
        title: 'Project updated',
        description: `"${data.name}" has been updated successfully.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    try {
      deleteProject(id);
      toast({
        title: 'Project deleted',
        description: `"${project?.name}" has been deleted.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Shakespeare Projects</h1>
              <p className="text-muted-foreground">
                Manage your AI projects locally with prompts, notes, and resources
              </p>
            </div>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={setEditingProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 px-8 text-center">
              <div className="max-w-sm mx-auto space-y-4">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {projects.length === 0 ? 'No projects yet' : 'No projects found'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {projects.length === 0
                      ? 'Create your first Shakespeare project to get started.'
                      : 'Try adjusting your search terms.'}
                  </p>
                  {projects.length === 0 && (
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Project
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Project Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <ProjectForm
              onSubmit={handleCreateProject}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Project Dialog */}
        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            {editingProject && (
              <ProjectForm
                project={editingProject}
                onSubmit={handleUpdateProject}
                onCancel={() => setEditingProject(null)}
                isEditing
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Vibed with{' '}
            <a
              href="https://soapbox.pub/mkstack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MKStack
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}