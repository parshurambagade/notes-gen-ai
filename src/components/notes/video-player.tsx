import { YOUTUBE_EMBED_URL } from '@/constants'
import { VideoData } from '@/types/video.types'
import React from 'react'

const VideoPlayer = ({ videoData }: { videoData: VideoData }) => {
    return (
        <div className="rounded-2xl border bg-card overflow-hidden">
            {/* VIDEO PLAYER */}
            <div className="relative aspect-video">
                <iframe
                    src={`${YOUTUBE_EMBED_URL}/${videoData?.videoId}`}
                    title={videoData?.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>
        </div>
    )
}

export default VideoPlayer