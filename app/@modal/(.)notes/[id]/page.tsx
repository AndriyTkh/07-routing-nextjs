import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';

interface NotePreviewPageProps {
  params: { id: string };
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={params.id} />
    </HydrationBoundary>
  );
}
