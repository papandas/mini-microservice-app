# Remove the previous images
docker rmi -f $(docker images ms_blog_* -q)

# build docker image - query
#cd web

docker build -t ms_blog_posts ./posts
docker build -t ms_blog_comments ./comments
docker build -t ms_blog_query ./query
docker build -t ms_blog_moderation ./moderation
docker build -t ms_blog_eventbus ./event-bus
docker build -t ms_blog_client ./client
