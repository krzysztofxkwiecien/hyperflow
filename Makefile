all: push

container: image 

image:
	docker build -t doogfood/hyperflow:1.0.0 . # Build new image and automatically tag it as latest

push: image
	docker push doogfood/hyperflow:1.0.0 # Push image tagged as latest to repository

clean:
