#!/bin/bash
base_image=qiugu/dep:2.0;
music_image=qiugu/music:1.0;
# docker pull $base_image || true;
# docker pull $music_image || true;
docker build -t $music_image --cache-from $base_image --cache-from $music_image --build-arg BUILDKIT_INLINE_CACHE=1 ../;
docker push $base_image;
docker push $music_image;
