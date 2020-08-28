FROM node:8

# 앱 디렉터리
WORKDIR /usr/src/dgit

# 기본 설치
RUN apt-get update -y
RUN apt-get install sudo -y
RUN apt-get install curl -y
RUN apt-get install apt-transport-https -y

# yarn 설치
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update && sudo apt-get -y install yarn

# Node Update
RUN npm i -g n
RUN n stable

# 의존성 설치
COPY package.json package.json
RUN yarn

# 소스 추가
COPY . .

# 포트 바인딩
ENV PORT=8080
EXPOSE 8080

# Timezone
ENV TZ=Asia/Seoul

# 런타임 정의
RUN echo "yarn start" > "dgit.sh"
RUN chmod 777 dgit.sh
CMD ./dgit.sh
