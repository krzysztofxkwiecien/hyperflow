all: push

container: image 

image:
	docker build -t aghkkwiecien/hyperflow:latest . # Build new image and automatically tag it as latest
	docker tag aghkkwiecien/hyperflow:latest aghkkwiecien/hyperflow:1.0.0  # Add the version tag to the latest image

push: image
	docker push aghkkwiecien/hyperflow:latest # Push image tagged as latest to repository
	docker push aghkkwiecien/hyperflow:1.0.0 # Push version tagged image to repository (since this image is already pushed it will simply create or update version tag)

clean:
