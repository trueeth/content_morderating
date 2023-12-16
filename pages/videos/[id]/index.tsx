import { apiGetVideoContents } from '@interfaces/apis/videos'
import VideoInsightSection from '@sections/videos/video-insight'


export default function VideoInsightPage() {
  return <VideoInsightSection  />;
}


export async function generateStaticParams() {
  const resData = await apiGetVideoContents()

  return resData.data.Content.map((content) => ({
    id: content.Id,
  }))
}
