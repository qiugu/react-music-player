#!/bin/bash

# 初始缓存下载的依赖
docker build --target dependency --build-arg BUILDKIT_INLINE_CACHE=1 -t dep ../
docker tag dep qiugu/dep:2.0
docker image ls
docker push qiugu/dep:2.0

# 后续更新使用依赖缓存
# docker build --cache-from qiugu/dep:1.0 -t music ..
# docker image ls
# docker run -dp 8003:8003 --name demo music
