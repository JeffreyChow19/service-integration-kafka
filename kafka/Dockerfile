FROM confluentinc/cp-kafka:latest

USER root

COPY create_topics.sh /usr/bin/create_topics.sh
RUN sed -i 's/\r$//' /usr/bin/create_topics.sh && chmod +x /usr/bin/create_topics.sh

USER appuser

CMD ["sh", "-c", "/usr/bin/create_topics.sh & /etc/confluent/docker/run"]
