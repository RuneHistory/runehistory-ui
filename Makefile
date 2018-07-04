NAME:=runehistory/ui
TAG:=$$(git log -1 --pretty=format:%H)
IMG:=${NAME}:${TAG}
LATEST:=${NAME}:latest
CONFIG_PATH?=/etc/rhui.js

.PHONY: build
build:
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}

push:
	@docker push ${NAME}

login:
	@docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}

run:
	@docker run -d -p 80:80 \
		-v ${CONFIG_PATH}:/usr/share/nginx/html/static/app_config.js \
		--name rh-ui runehistory/ui:latest
