from fedora:27

run curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    dnf -y install yarn && \
    npm install gulp-cli -g


