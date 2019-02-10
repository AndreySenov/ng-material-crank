FROM node:lts-alpine
ENV PROJECT=ng-material-crank
ENV HOME=/home/node
RUN mkdir $HOME/.cache && \
    mkdir -p $HOME/$PROJECT/node_modules && \
    chown -R node:node $HOME
USER node
VOLUME $HOME/.cache
VOLUME $HOME/$PROJECT/node_modules
WORKDIR $HOME/$PROJECT
CMD ["sh"]
