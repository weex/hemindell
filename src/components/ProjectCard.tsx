import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, ExternalLink, Github, Calendar, Clock } from 'lucide-react';
import type { ShakespeareProject } from '@/types/shakespeare';

interface ProjectCardProps {
  project: ShakespeareProject;
  onEdit: (project: ShakespeareProject) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [showFullNotes, setShowFullNotes] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(project)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Project</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{project.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(project.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(project.createdAt)}
          </div>
          {project.updatedAt !== project.createdAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(project.updatedAt)}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Initial Prompt</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {showFullPrompt ? project.initialPrompt : truncateText(project.initialPrompt, 150)}
            {project.initialPrompt.length > 150 && (
              <button
                onClick={() => setShowFullPrompt(!showFullPrompt)}
                className="ml-1 text-primary hover:underline"
              >
                {showFullPrompt ? 'Show less' : 'Show more'}
              </button>
            )}
          </p>
        </div>

        {project.generalNotes && (
          <div>
            <h4 className="font-medium text-sm mb-2">General Notes</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {showFullNotes ? project.generalNotes : truncateText(project.generalNotes, 100)}
              {project.generalNotes.length > 100 && (
                <button
                  onClick={() => setShowFullNotes(!showFullNotes)}
                  className="ml-1 text-primary hover:underline"
                >
                  {showFullNotes ? 'Show less' : 'Show more'}
                </button>
              )}
            </p>
          </div>
        )}

        {project.textIds.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Text IDs ({project.textIds.length})</h4>
            <div className="flex flex-wrap gap-1">
              {project.textIds.slice(0, 5).map((id) => (
                <Badge key={id} variant="outline" className="text-xs">
                  {id}
                </Badge>
              ))}
              {project.textIds.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{project.textIds.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                GitHub
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
          {project.publishingUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1"
            >
              <a href={project.publishingUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live Site
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}