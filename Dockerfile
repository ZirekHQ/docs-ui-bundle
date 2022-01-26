FROM fedora:35

RUN dnf -y module install nodejs:16/minimal && \
    dnf clean all

WORKDIR /antora
RUN npm install -g gulp-cli
ADD package*.json .
RUN npm install

ADD . /antora
ENTRYPOINT ["gulp"]
