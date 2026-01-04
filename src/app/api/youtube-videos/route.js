import { NextResponse } from 'next/server';

function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  
  return hours * 3600 + minutes * 60 + seconds;
}

export async function GET(request) {
  try {
    const channelHandle = '@tineriivorbesc';
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'YouTube API key not configured. Please add YOUTUBE_API_KEY to your .env.local file.',
          videos: []
        },
        { status: 500 }
      );
    }

    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(channelHandle)}&type=channel&key=${apiKey}&maxResults=1`
    );

    if (!channelResponse.ok) {
      const errorData = await channelResponse.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Failed to fetch channel information');
    }

    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }

    const channelId = channelData.items[0].snippet.channelId;

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&key=${apiKey}&maxResults=30`
    );

    if (!videosResponse.ok) {
      const errorData = await videosResponse.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Failed to fetch videos');
    }

    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
      return NextResponse.json({ videos: [] });
    }

    const videoIds = videosData.items.map(item => item.id.videoId).join(',');

    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`
    );

    if (!videoDetailsResponse.ok) {
      const errorData = await videoDetailsResponse.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Failed to fetch video details');
    }

    const videoDetailsData = await videoDetailsResponse.json();

    const regularVideos = videoDetailsData.items
      .filter(item => {
        const duration = item.contentDetails?.duration;
        if (!duration) return false;
        const durationInSeconds = parseDuration(duration);
        return durationInSeconds >= 60;
      })
      .slice(0, 6)
      .map(item => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
      }));

    return NextResponse.json({ videos: regularVideos });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch YouTube videos',
        videos: []
      },
      { status: 500 }
    );
  }
}
