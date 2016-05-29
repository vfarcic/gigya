FROM alpine

RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

EXPOSE 80
ENV DB db

CMD ["gigya"]

COPY gigya /usr/local/bin/gigya
RUN chmod +x /usr/local/bin/gigya
