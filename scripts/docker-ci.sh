#!/bin/bash
base_image=qiugu/dep;
music_image=qiugu/music;
docker pull $base_image || true;
docker pull $music_image || true;
docker build -t $music_image --cache-from $base_image --cache-from $music_image --build-arg BUILDKIT_INLINE_CACHE=1 ../;
docker push $base_image;
docker push $music_image;
