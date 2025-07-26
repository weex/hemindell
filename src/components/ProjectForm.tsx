import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import type { ShakespeareProject, CreateProjectData } from '@/types/shakespeare';

interface ProjectFormProps {
  project?: ShakespeareProject;
  onSubmit: (data: CreateProjectData) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export function ProjectForm({ project, onSubmit, onCancel, isEditing = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    initialPrompt: project?.initialPrompt || '',
    generalNotes: project?.generalNotes || '',
    githubUrl: project?.githubUrl || '',
    publishingUrl: project?.publishingUrl || '',
  });

  const [textIds, setTextIds] = useState<string[]>(project?.textIds || []);
  const [newTextId, setNewTextId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      textIds,
    });
  };

  const addTextId = () => {
    if (newTextId.trim() && !textIds.includes(newTextId.trim())) {
      setTextIds([...textIds, newTextId.trim()]);
      setNewTextId('');
    }
  };

  const removeTextId = (id: string) => {
    setTextIds(textIds.filter(textId => textId !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTextId();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Project' : 'Create New Shakespeare Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialPrompt">Initial Prompt</Label>
            <Textarea
              id="initialPrompt"
              value={formData.initialPrompt}
              onChange={(e) => setFormData({ ...formData, initialPrompt: e.target.value })}
              placeholder="Enter the initial prompt for this project"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="generalNotes">General Notes</Label>
            <Textarea
              id="generalNotes"
              value={formData.generalNotes}
              onChange={(e) => setFormData({ ...formData, generalNotes: e.target.value })}
              placeholder="What do you want to fix next?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Text IDs</Label>
            <div className="flex gap-2">
              <Input
                value={newTextId}
                onChange={(e) => setNewTextId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add text ID"
              />
              <Button type="button" onClick={addTextId} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {textIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {textIds.map((id) => (
                  <Badge key={id} variant="secondary" className="flex items-center gap-1">
                    {id}
                    <button
                      type="button"
                      onClick={() => removeTextId(id)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username/repository"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publishingUrl">Publishing URL</Label>
            <Input
              id="publishingUrl"
              type="url"
              value={formData.publishingUrl}
              onChange={(e) => setFormData({ ...formData, publishingUrl: e.target.value })}
              placeholder="https://your-app.com"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Update Project' : 'Create Project'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}