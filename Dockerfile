FROM node:lts-alpine
ENV PROJECT=ng-material-crank
ENV HOME=/home/app
RUN addgroup app && \
    adduser -h $HOME -s /bin/false -G app -D app
USER app
WORKDIR $HOME
RUN mkdir .cache && \
    mkdir -p $PROJECT/node_modules
VOLUME $HOME/.cache
VOLUME $HOME/$PROJECT/node_modules
WORKDIR $HOME/$PROJECT
