#!/bin/bash
# Compress the hero video for web deployment (requires ffmpeg)
# Run: bash scripts/compress-video.sh
ffmpeg -i "public/videos/american-dream-avenue.mp4" \
  -vcodec libx264 -crf 28 -preset slow \
  -vf scale=1280:-2 -acodec aac -b:a 128k \
  -movflags +faststart \
  "public/videos/american-dream-avenue-web.mp4"
echo "Done. Replace video src with american-dream-avenue-web.mp4"
