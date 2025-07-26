# Shakespeare Projects Manager

A local storage-based project management app for tracking Shakespeare AI projects with prompts, notes, and resources.

## Features

- **Project Management**: Create, edit, and delete Shakespeare projects
- **Rich Data Storage**: Each project includes:
  - Project name
  - Initial prompt text
  - General notes for what to fix next
  - List of text IDs used in building the app
  - GitHub repository URL
  - Final publishing URL
- **Search & Filter**: Search across project names, prompts, and notes
- **Local Storage**: All data persists in browser local storage
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

- **Types**: TypeScript interfaces in `src/types/shakespeare.ts`
- **Hooks**: Custom hook `useShakespeareProjects` for data management
- **Components**: 
  - `ProjectForm` - Create/edit project form
  - `ProjectCard` - Display individual projects
- **Pages**: Main projects page at `/projects`

## Usage

1. **Create Project**: Click "New Project" to add a new Shakespeare project
2. **Edit Project**: Click the edit icon on any project card
3. **Delete Project**: Click the trash icon and confirm deletion
4. **Search**: Use the search bar to find projects by name, prompt, or notes
5. **Manage Text IDs**: Add/remove text IDs used in your project
6. **External Links**: Add GitHub and publishing URLs for easy access

## Data Storage

All project data is stored locally in your browser using localStorage. Projects include:

- Unique ID and timestamps
- Project metadata (name, URLs)
- Content (initial prompt, general notes)
- Text ID list for tracking resources
- Creation and update timestamps

## Technology Stack

- React 18 with TypeScript
- TailwindCSS for styling
- shadcn/ui components
- Lucide React icons
- Local storage for persistence
- Vite for development and building

---

*Vibed with [MKStack](https://soapbox.pub/mkstack)*# hemindell
