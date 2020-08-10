FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER 289136830@qq/com

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN mkdir -p /aix

WORKDIR /aix

EXPOSE 18088

ADD /target/guns-vip-main.jar ./

CMD sleep 30;java -Xms2048m -Xmx2048m -Djava.security.egd=file:/dev/./urandom -jar guns-vip-main.jar
