export type EntryKind =
  'folder' | 'pdf' | 'doc' | 'sheet' | 'image' | 'video' | 'audio' | 'zip' | 'generic';

export interface FileEntry {
  id: string;
  name: string;
  parentId: string | null;
  kind: EntryKind;
  /** Only present for files (folders show an item count instead). */
  size?: string;
  modified: string;
  owner: string;
  starred: boolean;
  shared: boolean;
  trashed: boolean;
}

export function entryIcon(kind: EntryKind) {
  const map: Record<EntryKind, string> = {
    folder: 'folder',
    pdf: 'picture_as_pdf',
    doc: 'description',
    sheet: 'table_chart',
    image: 'image',
    video: 'movie',
    audio: 'audiotrack',
    zip: 'folder_zip',
    generic: 'insert_drive_file',
  };
  return map[kind];
}

export function entryColor(kind: EntryKind) {
  const map: Record<EntryKind, string> = {
    folder: '#f59e0b',
    pdf: '#ef4444',
    doc: '#3b82f6',
    sheet: '#22c55e',
    image: '#eab308',
    video: '#8b5cf6',
    audio: '#ec4899',
    zip: '#64748b',
    generic: '#6b7280',
  };
  return map[kind];
}

// Placeholder data — wire this up to a real storage/file API when available.
export const files: FileEntry[] = [
  // Root ("My Drive")
  {
    id: 'f-documents',
    name: 'Documents',
    parentId: null,
    kind: 'folder',
    modified: '2 d ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'f-images',
    name: 'Images',
    parentId: null,
    kind: 'folder',
    modified: '5 d ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'f-videos',
    name: 'Videos',
    parentId: null,
    kind: 'folder',
    modified: '1 w ago',
    owner: 'Sara',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'f-design',
    name: 'Design Assets',
    parentId: null,
    kind: 'folder',
    modified: '3 d ago',
    owner: 'Sara',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-welcome',
    name: 'Welcome Guide.pdf',
    parentId: null,
    kind: 'pdf',
    size: '860 KB',
    modified: '2 w ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-roadmap',
    name: 'Q3 Roadmap.pdf',
    parentId: null,
    kind: 'pdf',
    size: '1.2 MB',
    modified: '1 h ago',
    owner: 'You',
    starred: true,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-retreat',
    name: 'Team Retreat.mp4',
    parentId: null,
    kind: 'video',
    size: '412 MB',
    modified: '3 d ago',
    owner: 'Sara',
    starred: false,
    shared: false,
    trashed: false,
  },

  // Documents/
  {
    id: 'f-contracts',
    name: 'Contracts',
    parentId: 'f-documents',
    kind: 'folder',
    modified: '2 d ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-handbook',
    name: 'Employee Handbook.docx',
    parentId: 'f-documents',
    kind: 'doc',
    size: '540 KB',
    modified: '1 mo ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-expenses',
    name: 'Expense Report.xlsx',
    parentId: 'f-documents',
    kind: 'sheet',
    size: '128 KB',
    modified: '4 h ago',
    owner: 'Sara',
    starred: false,
    shared: true,
    trashed: false,
  },
  {
    id: 'e-nda',
    name: 'NDA Template.pdf',
    parentId: 'f-documents',
    kind: 'pdf',
    size: '210 KB',
    modified: '2 w ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: false,
  },

  // Documents/Contracts/
  {
    id: 'e-acme',
    name: 'Acme Co. Agreement.pdf',
    parentId: 'f-contracts',
    kind: 'pdf',
    size: '980 KB',
    modified: '3 d ago',
    owner: 'You',
    starred: true,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-nimbus',
    name: 'Nimbus MSA.pdf',
    parentId: 'f-contracts',
    kind: 'pdf',
    size: '1.1 MB',
    modified: '1 w ago',
    owner: 'Sara',
    starred: false,
    shared: true,
    trashed: false,
  },

  // Images/
  {
    id: 'e-shoot1',
    name: 'Product Shoot 01.jpg',
    parentId: 'f-images',
    kind: 'image',
    size: '4.2 MB',
    modified: '5 d ago',
    owner: 'Sara',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-shoot2',
    name: 'Product Shoot 02.jpg',
    parentId: 'f-images',
    kind: 'image',
    size: '3.8 MB',
    modified: '5 d ago',
    owner: 'Sara',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-teamphoto',
    name: 'Team Photo.png',
    parentId: 'f-images',
    kind: 'image',
    size: '6.1 MB',
    modified: '2 w ago',
    owner: 'You',
    starred: false,
    shared: true,
    trashed: false,
  },

  // Videos/
  {
    id: 'e-onboarding',
    name: 'Onboarding Walkthrough.mp4',
    parentId: 'f-videos',
    kind: 'video',
    size: '186 MB',
    modified: '1 w ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-demo',
    name: 'Demo Recording.mov',
    parentId: 'f-videos',
    kind: 'video',
    size: '340 MB',
    modified: '2 d ago',
    owner: 'Sara',
    starred: true,
    shared: false,
    trashed: false,
  },

  // Design Assets/
  {
    id: 'e-brand',
    name: 'Brand Guidelines.pdf',
    parentId: 'f-design',
    kind: 'pdf',
    size: '2.4 MB',
    modified: '3 d ago',
    owner: 'Sara',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-logopack',
    name: 'Logo Pack.zip',
    parentId: 'f-design',
    kind: 'zip',
    size: '18 MB',
    modified: '1 mo ago',
    owner: 'Sara',
    starred: false,
    shared: false,
    trashed: false,
  },
  {
    id: 'e-iconset',
    name: 'Icon Set.zip',
    parentId: 'f-design',
    kind: 'zip',
    size: '9 MB',
    modified: '2 mo ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: true,
  },
  {
    id: 'e-wireframes',
    name: 'Old Wireframes.pdf',
    parentId: 'f-design',
    kind: 'pdf',
    size: '3.1 MB',
    modified: '3 mo ago',
    owner: 'You',
    starred: false,
    shared: false,
    trashed: true,
  },
];

export const storageUsage = {
  usedGb: 128,
  totalGb: 256,
  breakdown: [
    { label: 'Documents', gb: 42, color: '#ef4444' },
    { label: 'Images', gb: 31, color: '#eab308' },
    { label: 'Videos', gb: 48, color: '#8b5cf6' },
    { label: 'Other', gb: 7, color: '#64748b' },
  ],
};
