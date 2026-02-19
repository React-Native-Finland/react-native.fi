export function YouTubeEmbed({
  id,
  videos,
}: {
  id?: string;
  videos?: string[];
}) {
  const videoIds = videos || (id ? [id] : []);

  return (
    <div className='youtube-embed space-y-4'>
      {videoIds.map((videoId) => (
        <div key={videoId} className='aspect-video w-full'>
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${videoId}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='w-full h-full'
          />
        </div>
      ))}
    </div>
  );
}
